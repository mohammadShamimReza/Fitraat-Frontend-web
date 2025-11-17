import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { storeInitialRender } from "@/redux/slice/initialRenderSlice";
import { KagelTime, KagelTimeEntry } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Progress } from "antd";
import { useEffect, useRef, useState } from "react";
import squizze from "../../app/assets/squizze.mp3";
import stop from "../../app/assets/stop.mp3";

type SequenceStep = {
  label: "Squizze" | "Stop" | "Gap";
  seconds: number;
};

function Kagel({ kegel }: { kegel: KagelTime[] | undefined }) {
  // index of which KagelTime (outer set) is selected
  const [setIndex, setSetIndex] = useState<number>(0);

  // sequence for the selected KagelTime, e.g. [{label: "Squizze", seconds:3}, {label:"Stop", seconds:3}, ..., {label:"Gap", seconds:30}]
  const [sequence, setSequence] = useState<SequenceStep[]>([]);

  // which index inside the sequence is currently running
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // ms values
  const [timeLeftMs, setTimeLeftMs] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  const timerId = useRef<number | undefined>(undefined);
  const isMounted = useRef(false);

  const initialRender = useAppSelector((state) => state.initialRenderSlice);
  const dispatch = useAppDispatch();

  // Build sequence from the selected KagelTime entry
  function buildSequenceFromKagelEntry(entry?: KagelTime): SequenceStep[] {
    if (!entry || !entry.times || entry.times.length === 0) return [];
    const seq: SequenceStep[] = [];

    // for every KagelTimeEntry, push squizz then stop
    entry.times.forEach((t: KagelTimeEntry) => {
      // only push if value > 0
      if (typeof t.squizz === "number" && t.squizz > 0)
        seq.push({ label: "Squizze", seconds: t.squizz });
      if (typeof t.stop === "number" && t.stop > 0)
        seq.push({ label: "Stop", seconds: t.stop });
    });

    // optionally push gap as a final "rest" step if gap > 0
    if (typeof entry.gap === "number" && entry.gap > 0) {
      seq.push({ label: "Gap", seconds: entry.gap });
    }

    return seq;
  }
  const [size, setSize] = useState(200);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) setSize(100); // sm screens
      else if (width < 1024) setSize(150); // md screens
      else setSize(200); // lg and above
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  // When kegel or setIndex changes, rebuild sequence and reset indices
  useEffect(() => {
    const entry = kegel && kegel.length > 0 ? kegel[setIndex] : undefined;
    const seq = buildSequenceFromKagelEntry(entry);
    setSequence(seq);
    setCurrentStepIndex(0);
    setProgressPercent(0);
    if (seq.length > 0) {
      const firstMs = seq[0].seconds * 1000;
      setTimeLeftMs(firstMs);
    } else {
      setTimeLeftMs(0);
    }
  }, [kegel, setIndex]);

  // Keep audio from playing on initial app render
  useEffect(() => {
    if (initialRender.initialRender) {
      dispatch(storeInitialRender(false));
      return;
    }
    // For subsequent changes to current step label, we will play audio elsewhere (see effect below)
  }, [dispatch, initialRender.initialRender]);

  const getAudioForLabel = (label: SequenceStep["label"]) =>
    label === "Squizze" ? squizze : stop;

  // Start/Stop API
  const startTimer = () => {
    if (sequence.length === 0) return;
    // if previous finished, reset the current step
    if (progressPercent === 100 || timeLeftMs <= 0) {
      const ms =
        sequence[currentStepIndex] && sequence[currentStepIndex].seconds
          ? sequence[currentStepIndex].seconds * 1000
          : 0;
      setTimeLeftMs(ms);
      setProgressPercent(0);
    }
    // play audio immediately for the current step (honoring initialRender logic happens by checking initialRender in other effects)
    const curLabel = sequence[currentStepIndex]?.label;
    if (!initialRender.initialRender && curLabel) {
      new Audio(getAudioForLabel(curLabel)).play();
    }
    isMounted.current = true;
    setIsRunning(true);
  };

  const stopTimer = () => {
    if (timerId.current) {
      window.clearInterval(timerId.current);
    }
    setIsRunning(false);
  };

  // interval to decrement timeLeftMs
  useEffect(() => {
    if (isRunning) {
      timerId.current = window.setInterval(() => {
        setTimeLeftMs((prev) => Math.max(0, prev - 100));
      }, 100);
      return () => {
        if (timerId.current) window.clearInterval(timerId.current);
      };
    }
    // clear when not running
    return;
  }, [isRunning]);

  // Handle step progression and progress percent
  useEffect(() => {
    const curStep = sequence[currentStepIndex];
    if (!curStep) {
      setProgressPercent(0);
      return;
    }

    // If timeLeftMs was just set to the step duration, ensure progress is 0
    const stepMs = curStep.seconds * 1000;

    // compute percent
    if (stepMs > 0) {
      const percent = Math.round(((stepMs - timeLeftMs) / stepMs) * 100);
      setProgressPercent(Math.min(100, Math.max(0, percent)));
    } else {
      setProgressPercent(100);
    }

    // When timeLeftMs reaches 0, advance to next step
    if (timeLeftMs <= 0 && isRunning) {
      // play sound for the step completion depending on next step or same step
      // advance
      const nextIndex = currentStepIndex + 1;
      if (nextIndex >= sequence.length) {
        // finished this KagelTime sequence
        // stop interval and mark finished
        if (timerId.current) window.clearInterval(timerId.current);
        setIsRunning(false);
        setProgressPercent(100);
      } else {
        // move to next step
        setCurrentStepIndex(nextIndex);
        const nextMs = sequence[nextIndex].seconds * 1000;
        setTimeLeftMs(nextMs);
        setProgressPercent(0);

        // play audio for the next step (if not initial app render)
        if (!initialRender.initialRender) {
          const audioPath = getAudioForLabel(sequence[nextIndex].label);
          new Audio(audioPath).play();
        }
      }
    }
  }, [
    timeLeftMs,
    currentStepIndex,
    sequence,
    isRunning,
    initialRender.initialRender,
  ]);

  // Whenever currentStepIndex changes (e.g., user pressed next/prev or we advanced), set timeLeftMs to that step duration
  useEffect(() => {
    const cur = sequence[currentStepIndex];
    if (cur) {
      setTimeLeftMs(cur.seconds * 1000);
      setProgressPercent(0);
      // play audio when step changes (but don't play on the very first render due to initialRender)
      if (!initialRender.initialRender && isMounted.current && isRunning) {
        new Audio(getAudioForLabel(cur.label)).play();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex, sequence]);

  // Prev / Next outer KagelTime set
  const handlePrevious = () => {
    if (!kegel || kegel.length === 0) return;
    if (setIndex > 0) {
      setSetIndex((s) => s - 1);
      setCurrentStepIndex(0);
      setIsRunning(false);
      if (timerId.current) window.clearInterval(timerId.current);
    }
  };

  const handleNext = () => {
    if (!kegel || kegel.length === 0) return;
    if (setIndex < kegel.length - 1) {
      setSetIndex((s) => s + 1);
      setCurrentStepIndex(0);
      setIsRunning(false);
      if (timerId.current) window.clearInterval(timerId.current);
    }
  };

  const currentLabel = sequence[currentStepIndex]?.label ?? "";
  const totalSets = kegel?.length ?? 0;
  const currentSetSerial =
    kegel && kegel[setIndex] ? kegel[setIndex].serial : setIndex + 1;

  return (
    <div>
      <div className="flex flex-col items-center ">
        <p className="text-xl mb-3">
          <span className="text-red-500">{currentLabel}</span>,{" "}
          <span className=""> {setIndex + 1}</span>/{totalSets} (serial:{" "}
          {currentSetSerial})
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "8px",
            width: "100%",
            backgroundColor: "#f9fafb",
            padding: "10px 14px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
          }}
        >
          <span
            style={{
              color: "#111827",
              fontWeight: 700,
              fontSize: "18px",
              marginRight: "8px",
            }}
          >
            Type:
          </span>

          {sequence.map((s, i) => {
            const isActive = i === currentStepIndex;
            return (
              <span
                key={i}
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  backgroundColor: isActive ? "#fee2e2" : "#f3f4f6",
                  color: isActive ? "#b91c1c" : "#374151",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: isActive ? "12px" : "10px",
                  boxShadow: isActive
                    ? "0 0 5px rgba(239, 68, 68, 0.4)"
                    : "none",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {s.seconds}s <span style={{ opacity: 0.7 }}>({s.label})</span>
              </span>
            );
          })}
        </div>

        <span className="text-red-500 block min-h-[1em]">
          {setIndex + 1 === totalSets ? "Last finishing" : "\u00A0"}
        </span>
        <br />

        <div className="mb-5 mt-2 flex justify-center ">
          <Progress percent={progressPercent} type="circle" size={size} />
        </div>

        <Button.Group>
          <Button onClick={startTimer}>Start</Button>
          <Button onClick={stopTimer}>Stop</Button>
        </Button.Group>

        <div className="basis-1/6 flex justify-center align-bottom flex-col">
          <div className="flex justify-between mt-4 gap-5">
            <button
              className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700
                ${
                  setIndex === 0 || !kegel || kegel.length === 0
                    ? "bg-gray-500 cursor-not-allowed "
                    : "bg-gray-700 hover:bg-gray-700"
                }
                `}
              onClick={handlePrevious}
              disabled={setIndex === 0 || !kegel || kegel.length === 0}
            >
              <span style={{ paddingRight: "10px" }}>
                <ArrowLeftOutlined />
              </span>
              Previous
            </button>

            <button
              className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700
                   ${
                     !kegel || setIndex === kegel.length - 1
                       ? "bg-gray-500 cursor-not-allowed "
                       : "bg-gray-700 hover:bg-gray-700"
                   }`}
              onClick={handleNext}
              disabled={!kegel || setIndex === kegel.length - 1}
            >
              Next
              <span style={{ paddingLeft: "10px" }}>
                <ArrowRightOutlined />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kagel;

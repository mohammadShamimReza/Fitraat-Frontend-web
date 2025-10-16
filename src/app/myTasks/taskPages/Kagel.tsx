// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { storeInitialRender } from "@/redux/slice/initialRenderSlice";
// import { KagelTime } from "@/types/contantType";
// import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
// import { Button, Progress } from "antd";
// import { useEffect, useRef, useState } from "react";
// import squizze from "../../assets/squizze.mp3";
// import stop from "../../assets/stop.mp3";

// function Kagel({
//   selectedTask,
//   kegel,
// }: {
//   selectedTask: string;
//   kegel: KagelTime[] | undefined;
// }) {
//   function getKegelTimes(text: string) {
//     const numbersArray = text.split(/,\s*/);
//     return numbersArray.map(Number);
//   }

//   const [times, setTimes] = useState<number>(0);
//   const [kegelTimes, setKegelTimes] = useState<number[]>([2, 3]);

//   useEffect(() => {
//     if (kegel && kegel.length > 0 && kegel[times]?.attributes.times) {
//       const newTimes = getKegelTimes(kegel[times]?.attributes.times);
//       setKegelTimes(newTimes);
//     }
//   }, [kegel, times]); // Run this effect only when `kegel` changes

//   const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
//   const [currentTime, setCurrentTime] = useState(
//     kegelTimes[currentTimeIndex] * 1000
//   );

//   const [timeLeft, setTimeLeft] = useState(currentTime);
//   const [progressBarPercent, setProgressBarPercent] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [type, setType] = useState("");

//   const timerId = useRef<NodeJS.Timeout | undefined | number>(undefined);
//   const isInitialRender = useRef(true);

//   const initialRender = useAppSelector((state) => state.initialRenderSlice);
//   const dispatch = useAppDispatch();
//   const isMounted = useRef(false);

//   useEffect(() => {
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   useEffect(() => {
//     if (initialRender.initialRender) {
//       dispatch(storeInitialRender(false));
//       return;
//     } else if (!initialRender.initialRender && isMounted.current) {
//       if (type === "Squizze") {
//         new Audio(squizze).play();
//       } else if (type === "Stop") {
//         new Audio(stop).play();
//       }
//     }
//   }, [dispatch, initialRender.initialRender, type]);
//   const audioType = type === "Squizze" ? squizze : stop;

//   const startTimer = () => {
//     // clearInterval(timerId.current);
//     new Audio(audioType).play();
//     isMounted.current = true;
//     if (progressBarPercent === 100) {
//       setTimeLeft(currentTime);
//       setProgressBarPercent(0);
//     }
//     setIsRunning(true);
//   };

//   const stopTimer = () => {
//     clearInterval(timerId.current);
//     setIsRunning(false);
//   };

//   useEffect(() => {
//     if (isRunning) {
//       timerId.current = window.setInterval(() => {
//         setTimeLeft((prevTimeLeft) => prevTimeLeft - 100);
//       }, 100);

//       return () => clearInterval(timerId.current);
//     }
//   }, [isRunning]);

//   useEffect(() => {
//     currentTimeIndex % 2 === 0 ? setType("Squizze") : setType("Stop");

//     if (progressBarPercent < 100) {
//       let updateProgressPercent = Math.round(
//         ((currentTime - timeLeft) / currentTime) * 100
//       );
//       setProgressBarPercent(updateProgressPercent);
//     } else if (progressBarPercent === 100) {
//       if (currentTimeIndex + 1 === kegelTimes.length) {
//         clearInterval(timerId.current);
//         setIsRunning(false);
//       } else {
//         setCurrentTimeIndex(currentTimeIndex + 1);
//         setCurrentTime(kegelTimes[currentTimeIndex] * 1000);
//         setProgressBarPercent(0);

//         setTimeLeft(kegelTimes[currentTimeIndex] * 1000);
//       }
//     }
//   }, [
//     currentTime,
//     currentTimeIndex,
//     timeLeft,
//     isRunning,
//     kegelTimes,
//     progressBarPercent,
//   ]);

//   const handlePrevious = () => {
//     if (kegel && kegel.length > 0 && times > 0) {
//       setTimes(times - 1);
//       setCurrentTimeIndex(0);
//       setCurrentTime(kegelTimes[currentTimeIndex] * 1000);
//       setProgressBarPercent(0);

//       setTimeLeft(kegelTimes[currentTimeIndex] * 1000);
//     }
//   };

//   const handleNext = () => {
//     if (kegel && times < kegel.length - 1) {
//       setTimes(times + 1);
//       setCurrentTimeIndex(0);
//       setCurrentTime(kegelTimes[currentTimeIndex] * 1000);
//       setProgressBarPercent(0);

//       setTimeLeft(kegelTimes[currentTimeIndex] * 1000);
//     }
//   };

//   return (
//     <div
//     //   className="h-full
//     // "
//     >
//       {selectedTask === "kagel" && (
//         <div className="flex flex-col items-center ">
//           <p className="text-xl">
//             <span className="text-red-500">{type}</span>,{" "}
//             <span className=""> {times + 1}</span>/{kegel?.length}
//           </p>
//           <div>
//             {kegelTimes.map((time, index) => (
//               <span
//                 key={index}
//                 style={{
//                   color: index === currentTimeIndex ? "red" : "black",
//                   marginRight: "10px", // Adjust spacing as needed
//                   fontSize: index === currentTimeIndex ? "25px" : "",
//                 }}
//               >
//                 {time}s
//               </span>
//             ))}
//           </div>
//           <span className="text-red-500">
//             {" "}
//             {times + 1 === kegel?.length ? "Last finishing" : ""}
//           </span>
//           <br />

//           <div className="mb-10 flex justify-center">
//             <Progress percent={progressBarPercent} type="circle" size={200} />
//           </div>
//           <Button.Group>
//             <Button onClick={startTimer}>Start</Button>
//             <Button onClick={stopTimer}>Stop</Button>
//           </Button.Group>
//           <div className="basis-1/6 flex justify-center align-bottom flex-col">
//             <div className="flex justify-between mt-4 gap-5">
//               <button
//                 className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700
//                 ${
//                   times === 0 || !kegel || kegel.length === 0
//                     ? "bg-gray-500 cursor-not-allowed "
//                     : "bg-gray-700 hover:bg-gray-700"
//                 }
//                 `}
//                 onClick={handlePrevious}
//                 disabled={times === 0 || !kegel || kegel.length === 0}
//               >
//                 <span style={{ paddingRight: "10px" }}>
//                   {" "}
//                   <ArrowLeftOutlined />
//                 </span>
//                 Previous
//               </button>

//               <button
//                 className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700"
//                    ${
//                      !kegel || times === kegel.length - 1
//                        ? "bg-gray-500 cursor-not-allowed "
//                        : "bg-gray-700 hover:bg-gray-700"
//                    }`}
//                 onClick={handleNext}
//                 disabled={!kegel || times === kegel.length - 1}
//               >
//                 Next
//                 <span style={{ paddingLeft: "10px" }}>
//                   <ArrowRightOutlined />
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Kagel;

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { storeInitialRender } from "@/redux/slice/initialRenderSlice";
import { KagelTime, KagelTimeEntry } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Progress } from "antd";
import { useEffect, useRef, useState } from "react";
import squizze from "../../assets/squizze.mp3";
import stop from "../../assets/stop.mp3";

type SequenceStep = {
  label: "Squizze" | "Stop" | "Gap";
  seconds: number;
};

function Kagel({
  selectedTask,
  kegel,
}: {
  selectedTask: string;
  kegel: KagelTime[] | undefined;
}) {
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
      {selectedTask === "kagel" && (
        <div className="flex flex-col items-center ">
          <p className="text-xl">
            <span className="text-red-500">{currentLabel}</span>,{" "}
            <span className=""> {setIndex + 1}</span>/{totalSets} (serial:{" "}
            {currentSetSerial})
          </p>

          <div>
            {sequence.map((s, i) => (
              <span
                key={i}
                style={{
                  color: i === currentStepIndex ? "red" : "black",
                  marginRight: 10,
                  fontSize: i === currentStepIndex ? 20 : undefined,
                }}
              >
                {s.seconds}s{`(${s.label})`}
              </span>
            ))}
          </div>

          <span className="text-red-500">
            {setIndex + 1 === totalSets ? "Last finishing" : ""}
          </span>
          <br />

          <div className="mb-10 flex justify-center">
            <Progress percent={progressPercent} type="circle" size={200} />
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
      )}
    </div>
  );
}

export default Kagel;

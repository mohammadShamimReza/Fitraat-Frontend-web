import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { storeInitialRender } from "@/redux/slice/initialRenderSlice";
import { KagelTime } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Progress } from "antd";
import { useEffect, useRef, useState } from "react";
import squizze from "../../assets/squizze.mp3";
import stop from "../../assets/stop.mp3";

function Kagel({
  selectedTask,
  kegel,
}: {
  selectedTask: string;
  kegel: KagelTime[] | undefined;
}) {
  function getKegelTimes(text: string) {
    const numbersArray = text.split(/,\s*/);
    return numbersArray.map(Number);
  }

  const [times, setTimes] = useState<number>(0);
  const [kegelTimes, setKegelTimes] = useState<number[]>([2, 3]);

  useEffect(() => {
    if (kegel && kegel.length > 0 && kegel[times]?.attributes.times) {
      const newTimes = getKegelTimes(kegel[times]?.attributes.times);
      setKegelTimes(newTimes);
    }
  }, [kegel, times]); // Run this effect only when `kegel` changes

  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    kegelTimes[currentTimeIndex] * 1000
  );

  const [timeLeft, setTimeLeft] = useState(currentTime);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [type, setType] = useState("");

  const timerId = useRef<NodeJS.Timeout | undefined | number>(undefined);
  const isInitialRender = useRef(true);

  const initialRender = useAppSelector((state) => state.initialRenderSlice);
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (initialRender.initialRender) {
      dispatch(storeInitialRender(false));
      return;
    } else if (!initialRender.initialRender && isMounted.current) {
      if (type === "Squizze") {
        new Audio(squizze).play();
      } else if (type === "Stop") {
        new Audio(stop).play();
      }
    }
  }, [dispatch, initialRender.initialRender, type]);
  const audioType = type === "Squizze" ? squizze : stop;

  const startTimer = () => {
    // clearInterval(timerId.current);
    new Audio(audioType).play();
    isMounted.current = true;
    if (progressBarPercent === 100) {
      setTimeLeft(currentTime);
      setProgressBarPercent(0);
    }
    setIsRunning(true);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      timerId.current = window.setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 100);
      }, 100);

      return () => clearInterval(timerId.current);
    }
  }, [isRunning]);

  useEffect(() => {
    currentTimeIndex % 2 === 0 ? setType("Squizze") : setType("Stop");

    if (progressBarPercent < 100) {
      let updateProgressPercent = Math.round(
        ((currentTime - timeLeft) / currentTime) * 100
      );
      setProgressBarPercent(updateProgressPercent);
    } else if (progressBarPercent === 100) {
      if (currentTimeIndex + 1 === kegelTimes.length) {
        clearInterval(timerId.current);
        setIsRunning(false);
      } else {
        setCurrentTimeIndex(currentTimeIndex + 1);
        setCurrentTime(kegelTimes[currentTimeIndex] * 1000);
        setProgressBarPercent(0);

        setTimeLeft(kegelTimes[currentTimeIndex] * 1000);
      }
    }
  }, [
    currentTime,
    currentTimeIndex,
    timeLeft,
    isRunning,
    kegelTimes,
    progressBarPercent,
  ]);

  const handlePrevious = () => {
    if (kegel && kegel.length > 0 && times > 0) {
      setTimes(times - 1);
      setCurrentTimeIndex(0);
      setCurrentTime(kegelTimes[currentTimeIndex] * 1000);
      setProgressBarPercent(0);

      setTimeLeft(kegelTimes[currentTimeIndex] * 1000);
    }
  };

  const handleNext = () => {
    if (kegel && times < kegel.length - 1) {
      setTimes(times + 1);
      setCurrentTimeIndex(0);
      setCurrentTime(kegelTimes[currentTimeIndex] * 1000);
      setProgressBarPercent(0);

      setTimeLeft(kegelTimes[currentTimeIndex] * 1000);
    }
  };

  return (
    <div
    //   className="h-full
    // "
    >
      {selectedTask === "kagel" && (
        <div className="flex flex-col items-center ">
          <p className="text-xl">
            <span className="text-red-500">{type}</span>,{" "}
            <span className=""> {times + 1}</span>/{kegel?.length}
          </p>
          <div>
            {kegelTimes.map((time, index) => (
              <span
                key={index}
                style={{
                  color: index === currentTimeIndex ? "red" : "black",
                  marginRight: "10px", // Adjust spacing as needed
                  fontSize: index === currentTimeIndex ? "25px" : "",
                }}
              >
                {time}s
              </span>
            ))}
          </div>
          <span className="text-red-500">
            {" "}
            {times + 1 === kegel?.length ? "Last finishing" : ""}
          </span>
          <br />

          <div className="mb-10 flex justify-center">
            <Progress percent={progressBarPercent} type="circle" size={200} />
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
                  times === 0 || !kegel || kegel.length === 0
                    ? "bg-gray-500 cursor-not-allowed "
                    : "bg-gray-700 hover:bg-gray-700"
                }
                `}
                onClick={handlePrevious}
                disabled={times === 0 || !kegel || kegel.length === 0}
              >
                <span style={{ paddingRight: "10px" }}>
                  {" "}
                  <ArrowLeftOutlined />
                </span>
                Previous
              </button>

              <button
                className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700"
                   ${
                     !kegel || times === kegel.length - 1
                       ? "bg-gray-500 cursor-not-allowed "
                       : "bg-gray-700 hover:bg-gray-700"
                   }`}
                onClick={handleNext}
                disabled={!kegel || times === kegel.length - 1}
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

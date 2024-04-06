import { KegelTimes } from "@/types/contantType";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Progress } from "antd";
import { useEffect, useRef, useState } from "react";

function Kagel({
  selectedTask,
  kegel,
}: {
  selectedTask: string;
  kegel: KegelTimes[] | undefined;
}) {
  const kegelTimes = [2, 3];

  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    kegelTimes[currentTimeIndex] * 1000
  );
  const [timeLeft, setTimeLeft] = useState(kegelTimes[0] * 1000);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [type, setType] = useState("");

  const timerId = useRef<NodeJS.Timeout | undefined | number>(undefined);

  const startTimer = () => {
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
    currentTimeIndex % 2 === 0 ? setType("Squizz") : setType("Stop");

    if (currentTime) {
      if (progressBarPercent < 100) {
        let updateProgressPercent = Math.round(
          ((currentTime - timeLeft) / currentTime) * 100
        );
        setProgressBarPercent(updateProgressPercent);
      }

      if (timeLeft === 0 && timerId.current) {
        clearInterval(timerId.current);
        setIsRunning(false);
      }
    }

    if (progressBarPercent === 100) {
      if (currentTimeIndex + 1 === kegelTimes.length) {
        clearInterval(timerId.current);
        setIsRunning(false);
      } else {
        setCurrentTime(kegelTimes[currentTimeIndex + 1] * 1000);
        setCurrentTimeIndex(currentTimeIndex + 1);

        setTimeLeft(currentTime);
        setProgressBarPercent(0);
        setIsRunning(true);
      }
    }
  }, [currentTime, currentTimeIndex, timeLeft, isRunning]);

  const handlePrevious = () => {};
  const handleNext = () => {};

  return (
    <div>
      {selectedTask === "kagel" && (
        <div className="flex flex-col items-center p-5 rounded-lg border-2">
          <p className="text-2xl">
            {type} {currentTime / 1000}s
          </p>
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
                className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700`}
                // ${
                //   selectedTaskIndex === 0
                //     ? "bg-gray-500 cursor-not-allowed "
                //     : "bg-gray-600 hover:bg-gray-700"
                //   }
                // `}
                onClick={handlePrevious}
                // disabled={selectedTaskIndex === 0}
              >
                <span style={{ paddingRight: "10px" }}>
                  {" "}
                  <ArrowLeftOutlined />
                </span>
                Previous
              </button>

              <button
                className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700"
                  }`}
                onClick={handleNext}
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

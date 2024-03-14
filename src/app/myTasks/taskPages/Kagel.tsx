import { Button, Progress } from "antd";
import { useEffect, useRef, useState } from "react";

function Kagel({ selectedTask }: { selectedTask: string }) {
  // const [percent, setPercent] = useState<number>(0);
  // const [isAnimating, setIsAnimating] = useState(false);
  // const [animationStartTime, setAnimationStartTime] = useState<number | null>(
  //   null
  // );
  // const [pausedTime, setPausedTime] = useState<number | null>(null);
  // const animationDuration = 8000;

  // const startAnimation = () => {
  //   setPercent(0); // Reset progress to 0 when starting
  //   setIsAnimating(true);
  //   setPausedTime(Date.now());
  //   if (pausedTime !== null) {
  //     setAnimationStartTime(Date.now() - pausedTime);
  //     setPausedTime(null);
  //   } else {
  //     setAnimationStartTime(Date.now());
  //   }
  // };

  // const stopAnimation = () => {
  //   setIsAnimating(false);
  //   setPausedTime(Date.now() - animationStartTime!);
  // };

  // useEffect(() => {
  //   if (isAnimating) {
  //     const interval = setInterval(() => {
  //       const elapsedTime = Date.now() - animationStartTime!;
  //       const progressPercentage = Math.min(
  //         100,
  //         (elapsedTime / animationDuration) * 100
  //       );
  //       setPercent(progressPercentage);
  //     }, 100);

  //     console.log(interval, "thsi si interval elapsed time");

  //     return () => clearInterval(interval);
  //   }
  // }, [isAnimating, animationStartTime]);
  const initialTime = 3000; // in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const timerId = useRef<NodeJS.Timeout | undefined | number>(undefined);

  const startTimer = () => {
      if (progressBarPercent === 100) {
        setTimeLeft(initialTime);
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
    if (initialTime) {
      if (progressBarPercent < 100) {
        let updateProgressPercent = Math.round(
          ((initialTime - timeLeft) / initialTime) * 100
        );
        setProgressBarPercent(updateProgressPercent);
      }

      if (timeLeft === 0 && timerId.current) {
        clearInterval(timerId.current);
        setIsRunning(false);
      }
    }
  }, [timeLeft]);

  return (
    <div>
      {selectedTask === "kagel" && (
        <div className="flex flex-col items-center">
          <div className="mb-10 flex justify-center">
            <Progress percent={progressBarPercent} type="circle" size={300} />
          </div>
          <Button.Group>
            <Button onClick={startTimer}>Start</Button>
            <Button onClick={stopTimer}>Stop</Button>
          </Button.Group>
        </div>
      )}
    </div>
  );
}

export default Kagel;

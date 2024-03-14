import { Button, Progress } from "antd";
import { useEffect, useState } from "react";

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

  let initialTime = 3; // in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [progressBarPercent, setProgressBarPercent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const time = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    const percent = Math.round(((initialTime - timeLeft) / initialTime) * 100);
    console.log(percent);
    if (timeLeft == 0) {
      clearInterval(time);
    }
    return () => clearInterval(time);
  }, [timeLeft]),
    console.log(timeLeft);

  // useEffect(() => {
  //   if (timeLeft <= 0) {
  //     setIsRunning(false);
  //   } else {
  //     setProgressBarPercent(
  //       Math.round(((initialTime - timeLeft) / initialTime) * 100)
  //     );
  //   }
  // }, [timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    initialTime = 3;
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div>
      {selectedTask === "kagel" && (
        <div className="flex flex-col items-center">
          <div className="mb-10 flex justify-center">
            <Progress percent={progressBarPercent} type="circle" size={300} />
          </div>
          <Button.Group>
            <Button onClick={handleStart} disabled={isRunning}>
              Start
            </Button>
            <Button onClick={handleStop} disabled={!isRunning}>
              Stop
            </Button>
          </Button.Group>
        </div>
      )}
    </div>
  );
}

export default Kagel;

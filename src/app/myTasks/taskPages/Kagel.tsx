import { Button, Progress } from "antd";
import { useEffect, useRef, useState } from "react";

function Kagel({ selectedTask }: { selectedTask: string }) {
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

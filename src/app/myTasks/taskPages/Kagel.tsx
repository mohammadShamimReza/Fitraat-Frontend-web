import { Button, Progress } from "antd";
import { useEffect, useState } from "react";

function Kagel({ selectedTask }: { selectedTask: string }) {
  const [percent, setPercent] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStartTime, setAnimationStartTime] = useState<number | null>(
    null
  );
  const [pausedTime, setPausedTime] = useState<number | null>(null);
  const animationDuration = 8000; // 8 seconds

  const startAnimation = () => {
    setPercent(0); // Reset progress to 0 when starting
    setIsAnimating(true);
    setPausedTime(Date.now());
    if (pausedTime !== null) {
      setAnimationStartTime(Date.now() - pausedTime);
      setPausedTime(null);
    } else {
      setAnimationStartTime(Date.now());
    }
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    setPausedTime(Date.now() - animationStartTime!);
  };

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - animationStartTime!;
        const progressPercentage = Math.min(
          100,
          (elapsedTime / animationDuration) * 100
        );
        setPercent(progressPercentage);
      }, 100);

      console.log(interval, "thsi si interval elapsed time");

      return () => clearInterval(interval);
    }
  }, [isAnimating, animationStartTime]);

  return (
    <div>
      {selectedTask === "kagel" && (
        <div className="flex flex-col items-center">
          <div className="mb-10 flex justify-center">
            <Progress percent={percent} type="circle" size={300} />
          </div>
          <Button.Group>
            <Button onClick={startAnimation} disabled={isAnimating}>
              Start
            </Button>
            <Button onClick={stopAnimation} disabled={!isAnimating}>
              Stop
            </Button>
          </Button.Group>
        </div>
      )}
    </div>
  );
}

export default Kagel;

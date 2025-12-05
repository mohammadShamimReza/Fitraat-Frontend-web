import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";

interface VideoWatermarkProps {
  email: string;
}

const VideoWatermark: React.FC<VideoWatermarkProps> = ({ email }) => {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString());
  const userInfo = useAppSelector((state) => state.auth.userInfo);
useEffect(() => {
  const interval = setInterval(() => {
    setTimestamp(new Date().toLocaleString());
  }, 1000);

  return () => clearInterval(interval);
}, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 180,
        left: 180,
        opacity: 0.35,
        fontSize: "16px",
        fontWeight: "600",
        color: "#000",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 9999,
        background: "rgba(255,255,255,0.6)",
        padding: "4px 10px",
        borderRadius: "6px",
      }}
    >
      {userInfo?.email} — {timestamp}
    </div>
  );
};

export default VideoWatermark;

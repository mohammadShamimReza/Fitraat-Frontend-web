import React, { useEffect, useState } from "react";

interface VideoWatermarkProps {
  email: string;
}

const VideoWatermark: React.FC<VideoWatermarkProps> = ({ email }) => {
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(new Date().toLocaleString());
    }, 1000); // update timestamp every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) rotate(-20deg)",
        opacity: 0.15,
        fontSize: "32px",
        fontWeight: "bold",
        color: "#000",
        pointerEvents: "none", // allow video interaction
        userSelect: "none",
        zIndex: 9999,
        whiteSpace: "nowrap",
      }}
    >
      {`${email} - ${timestamp}`}
    </div>
  );
};

export default VideoWatermark;

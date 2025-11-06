"use client";

interface VideoProps {
  videoUrl?: string;
}

export default function VideoPlayer({ videoUrl }: VideoProps) {
  const defaultChildProtectionVideo =
    "https://www.youtube.com/embed/x5ZLbnlIcx0"; // fallback

  return (
    <div className="h-full flex justify-center items-center w-full bg-black rounded-xl">
      <iframe
        width="100%"
        height="450px"
        className="sm:w-[90%] md:w-[80%] max-w-[900px] rounded-xl"
        src={videoUrl || defaultChildProtectionVideo}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Child Protection Video"
      />
    </div>
  );
}

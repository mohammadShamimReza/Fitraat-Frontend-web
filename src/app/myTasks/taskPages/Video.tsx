function Video({
  selectedTask,
  video,
}: {
  selectedTask: string;
  video: {
    videoUrl: string | undefined;
  };
}) {
  return (
    <div
    //   className="h-full
    // "
    >
      {selectedTask === "video" && (
        <div className="">
          <iframe
            width="100%"
            height="380px"
            className="rounded-xl"
            src={video?.videoUrl || `https://www.youtube.com/embed/RBSGKlAvoiM`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        /* Add video component here */
      )}
    </div>
  );
}

export default Video;

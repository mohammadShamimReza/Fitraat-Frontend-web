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
        <div className="h-full flex justify-center items-center w-full">
          <iframe
            width="100%"
            height="450px"
            className="sm:w-[90%] md:w-[80%] max-w-[900px] rounded-xl "
            src={
              `${video?.videoUrl}` ||
              `https://www.youtube.com/embed/7WUKdCV8J34`
            }
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

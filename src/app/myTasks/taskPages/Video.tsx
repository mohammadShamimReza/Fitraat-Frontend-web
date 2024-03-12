function Video({ selectedTask }: { selectedTask: string }) {
  return (
    <div>
      {selectedTask === "video" && (
        <div className="">
          <iframe
            width="100%"
            height="380px"
            src={`https://www.youtube.com/embed/RBSGKlAvoiM`}
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

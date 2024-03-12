function SuggestedBlog({ selectedTask }: { selectedTask: string }) {
  return (
    <div>
      {selectedTask === "suggestBlog" && (
        <p className="">
          Receive personalized suggestions for blog articles related to recovery
          and mindfulness.
        </p>
        /* Add suggested blog component here */
      )}
    </div>
  );
}

export default SuggestedBlog;

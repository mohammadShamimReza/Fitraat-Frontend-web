function SuggestedBlog({
  selectedTask,
  blog,
}: {
  selectedTask: string;
  blog: {
    title: string | undefined;
    content: string | undefined;
  };
}) {
  return (
    <div>
      {selectedTask === "suggestBlog" && (
        <p className="">{blog.content}</p>
        /* Add suggested blog component here */
      )}
    </div>
  );
}

export default SuggestedBlog;

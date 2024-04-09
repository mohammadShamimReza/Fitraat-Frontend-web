import Link from "next/link";

function SuggestedBlog({
  selectedTask,
  blog,
}: {
  selectedTask: string;
  blog: {
    id: number | undefined;
    title: string | undefined;
    content: string | undefined;
  };
}) {
  console.log(blog.id);
  return (
    <div>
      {selectedTask === "suggestBlog" && (
        <>
          <p className="">{blog?.content}</p>

          <Link
            href={`/blog/${blog.id}`}
            className="flex justify-center align-middle "
          >
            <div className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              <span>Read Full Blog</span>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}

export default SuggestedBlog;

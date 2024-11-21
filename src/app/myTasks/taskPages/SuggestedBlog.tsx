"use client";

import { marked } from "marked";
import Link from "next/link";
import { useState } from "react";

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
  const [hoveredWords, setHoveredWords] = useState<number[]>([]);

  const contentHtml = blog?.content ? marked(blog.content) : "";

  const resetHoveredWord = () => {
    // Reset all hovered words when mouse leaves
    setHoveredWords([]);
  };

  return (
    <div>
      {selectedTask === "Blog" && (
        <>
          <p className="text-center m-7 text-2xl underline ">{blog?.title}</p>
          <p className="line-clamp-[11] text-lg tracking-wider">
            {blog?.content && (
              <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            )}
          </p>

          <Link
            href={`/authBlog/${blog.id}`}
            className="flex justify-center align-middle "
          >
            <div className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-5">
              <span>Read Full Blog</span>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}

export default SuggestedBlog;

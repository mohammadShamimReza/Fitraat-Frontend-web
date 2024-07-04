"use client";

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

  const handleWordHover = (index: number) => {
    if (!hoveredWords.includes(index)) {
      setHoveredWords([...hoveredWords, index]);
    }
  };

  const resetHoveredWord = () => {
    // Reset all hovered words when mouse leaves
    setHoveredWords([]);
  };

  return (
    <div>
      {selectedTask === "Blog" && (
        <>
          <p className="text-center m-7 text-2xl underline">{blog?.title}</p>
          <p className="line-clamp-[11]">
            {blog?.content?.split(" ").map((word, index) => (
              <span
                key={index}
                onMouseEnter={() => handleWordHover(index)}
                // onMouseLeave={resetHoveredWord}
                style={{
                  color: hoveredWords.includes(index) ? "red" : "inherit",
                  cursor: "pointer",
                }}
                className=""
              >
                {word}{" "}
              </span>
            ))}
          </p>

          <Link
            href={`/blog/${blog.id}`}
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

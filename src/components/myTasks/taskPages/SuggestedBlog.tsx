"use client";

import { marked } from "marked";
import Link from "next/link";

function SuggestedBlog({
  blog,
}: {
  blog: {
    id: string | undefined;
    title: string | undefined;
    content: string | undefined;
  };
}) {
  const contentHtml = blog?.content ? marked(blog.content) : "";

  return (
    <div className="">
      <>
        <p className="text-center m-7 text-2xl underline">{blog?.title}</p>
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
    </div>
  );
}

export default SuggestedBlog;

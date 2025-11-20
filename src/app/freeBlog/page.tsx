"use client";

import { useGetFreeBlogsQuery } from "@/redux/api/freeBlogApi";
import { Blog } from "@/types/contantType";
import { useState } from "react";
import Blogs from "./Blogs";

function Page() {
  const [searchTerm] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(1);
  const paginationSize = 25;

  const {
    data: blogData,
    isLoading,
    isSuccess,
  } = useGetFreeBlogsQuery({ searchTerm, pageCount, paginationSize });

  // const handleSearchTerm = (data: any) => {
  //   setSearchTerm(data.searchTerm);
  //   setPageCount(1); // Reset to first page on new search
  // };

  console.log(blogData, "blog data");

  const total: number = blogData?.meta.pagination.total || 0;
  const totalPages = Math.ceil(total / paginationSize);

  const handlePageClick = (page: number) => {
    setPageCount(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="min-h-screen ">
        <div className="flex flex-col justify-between gap-3 ">
          <h2 className="text-3xl font-semibold text-center my-5 underline">
            <span className="text-red-500">Blogs</span> for you
          </h2>
          <div className="w-full  ">
            {isLoading
              ? Array.from({ length: 10 }, (_, index) => (
                  <div key={index} className="border">
                    <div className="h-full mb-10 p-4">
                      <div className="p-4 rounded-2xl shadow-xl border border-t dark:border-none mb-4 transition duration-100 transform hover:shadow-2xl isDarkMode h-72 flex flex-col justify-between">
                        <div className="h-full ">
                          <h2 className="text-gray-800 mb-4 text-3xl font-semibold overflow-clip animate-pulse w-1/2 h-8 bg-gray-300 rounded"></h2>
                          <div className="mb-2 isDarkMode line-clamp-5 text-justify animate-pulse w-full h-4/6 bg-gray-300 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : isSuccess &&
                blogData?.data?.map((blog: Blog) => (
                  <Blogs key={blog.id} blog={blog} />
                ))}

            {isLoading && <div className="text-center">Loading blogs...</div>}

            {/* Pagination Section */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`px-3 py-1 rounded ${
                      pageCount === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

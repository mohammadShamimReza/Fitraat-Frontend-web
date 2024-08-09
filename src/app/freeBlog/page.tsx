"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Pagination from "@/components/shared/Pagination";
import { useGetFreeBlogsQuery } from "@/redux/api/freeBlogApi";
import { Blog } from "@/types/contantType";
import * as yup from "yup";
import Blogs from "./Blogs";
import Trendings from "./Trendings";

function Page() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(1);
  const paginationSize = 10;
  const {
    data: blogData,
    isLoading,
    isSuccess,
  } = useGetFreeBlogsQuery({ searchTerm, pageCount, paginationSize });

  const handleSearchTerm = (data: any) => {
    setSearchTerm(data.searchTerm);
  };

  const validationSchema = yup.object().shape({
    searchTerm: yup.string(),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const total: number = blogData?.meta.pagination.total || 0;

  return (
    <div>
      <div className="min-h-screen">
        <div className="flex flex-col justify-between  gap-3 sm:flex-row">
          <div className="order-3">
            <Trendings />
          </div>
          <div className="w-full sm:w-4/5 order-2">
            <form
              onChange={handleSubmit(handleSearchTerm)}
              className="flex  justify-center align-middle"
            >
              <div className="mt-6 mb-14 w-1/2">
                <Controller
                  name="searchTerm"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="emasearchTermil"
                      type="searchTerm"
                      placeholder="Search here"
                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20  ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                    />
                  )}
                />
              </div>
            </form>

            {isLoading
              ? Array.from({ length: 10 }, (_, index) => (
                  <div key={index} className="">
                    <div className="h-full mb-10 p-4">
                      <div
                        className="p-4 rounded-2xl shadow-xl border border-t dark:border-none mb-4 transition duration-100 transform hover:shadow-2xl 
            isDarkMode h-72 flex flex-col justify-between"
                      >
                        <div className="h-full ">
                          <h2
                            className="text-gray-800 mb-4 
               text-3xl font-semibold overflow-clip animate-pulse w-1/2 h-8 bg-gray-300 rounded"
                          ></h2>
                          <div
                            className="mb-2
                isDarkMode line-clamp-5 text-justify animate-pulse w-full h-4/6 bg-gray-300 rounded"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : isSuccess
              ? blogData?.data.map((blog: Blog) => (
                  <Blogs key={1} blog={blog} />
                ))
              : ""}
          </div>
        </div>

        <Pagination
          pageCount={pageCount}
          setPageCount={setPageCount}
          total={total}
        />
      </div>
    </div>
  );
}

export default Page;

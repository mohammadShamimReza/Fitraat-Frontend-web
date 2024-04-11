"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";


import { useGetBlogsQuery } from "@/redux/api/blogApi";
import { Blog } from "@/types/contantType";
import * as yup from "yup";
import Blogs from "./Blogs";
import Pagination from "./Pagination";
import Trendings from "./Trendings";

function Page() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {
    data: blogData,
    isLoading,
    isSuccess,
  } = useGetBlogsQuery({ searchTerm });

  const handleSearchTerm = (data: any) => {
    setSearchTerm(data.searchTerm);
  };

  const validationSchema = yup.object().shape({
    searchTerm: yup.string(),
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div>
      <div className="">
        <div className="flex flex-col justify-between  gap-3 sm:flex-row">
          {/* <BlogType /> */}
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
            {blogData?.data.map((blog: Blog) => (
              <Blogs
                key={1}
                blog={blog}
                isLoading={isLoading}
                isSuccess={isSuccess}
              />
            ))}
          </div>
        </div>

        <Pagination />
      </div>
    </div>
  );
}

export default Page;

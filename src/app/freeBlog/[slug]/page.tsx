"use client";
import { useGetFreeBlogsByIdQuery } from "@/redux/api/freeBlogApi";
import { Skeleton } from "antd";
import { marked } from "marked";
import Image from "next/image";
import stopPornImage from "../../assets/stopPorn.png";

function Page({ params }: { params: { slug: string } }) {
  const blogId = params.slug;
  const { data, isLoading } = useGetFreeBlogsByIdQuery(blogId);
  const blogData = data?.data.attributes;
  console.log(blogData);
  const contentHtml = blogData?.content ? marked(blogData.content) : "";

  return isLoading ? (
    <div className="h-full mb-10 p-4 bg-white rounded-xl shadow-lg border border-t dark:border-none transition duration-100">
      <div className="p-4">
        {/* Title Skeleton */}
        <Skeleton.Input
          style={{ width: "50%", height: "24px", marginBottom: "20px" }}
          active
        />

        {/* Image Skeleton */}
        <Skeleton
          active
          paragraph={{
            rows: 8,
            width: ["100%", "95%", "90%", "85%", "80%", "75%", "70%", "65%"],
          }}
        />
        {/* Content Skeleton */}
        <Skeleton
          active
          paragraph={{
            rows: 8,
            width: ["100%", "95%", "90%", "85%", "80%", "75%", "70%", "65%"],
          }}
        />
      </div>
    </div>
  ) : (
    <div className="p-5">
      <div className="flex justify-between">
        <p className="text-right p-5">
          Author
          <span className="text-gray-500"> {blogData?.viewCount}</span>{" "}
        </p>
        <p className="text-right p-7">
          Total view:{" "}
          <span className="text-gray-500"> {blogData?.viewCount || 1}</span>{" "}
        </p>
      </div>
      <div className="">
        <div
          className="text-gray-700 mb-4 
            dark:text-gray-300 text-5xl font-semibold text-center"
        >
          {blogData?.title}
        </div>
        <br />
        <div className="flex align-middle justify-center h-full ">
          <Image
            src={blogData?.imageURL || stopPornImage}
            height={300}
            width={500}
            // layout="responsive"
            objectFit="cover"
            alt="Writer"
            className=" rounded-lg"
          />
        </div>

        <br />
        <div
          className="flex max-w-5xl mx-auto text-lg text-gray-600 p-5"
          style={{ lineHeight: "1.8" }}
        >
          {blogData?.content && (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          )}
        </div>
      </div>
      <br />

      <br />

      <div className="text-base "></div>
      <br />
      <br />
      <br />
    </div>
  );
}
export default Page;

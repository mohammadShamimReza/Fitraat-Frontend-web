"use client";
import { useGetProBlogsByIdQuery } from "@/redux/api/blogApi";
import { Skeleton } from "antd";
import { marked } from "marked";
import Image from "next/image";

function Page({ params }: { params: { slug: string } }) {
  const blogId = params.slug;
  const { data, isLoading } = useGetProBlogsByIdQuery(blogId);
  const blogData = data?.data;
  console.log(blogData, "this is blog data");
  const contentHtml = blogData?.content ? marked(blogData.content) : "";
  return isLoading ? (
    <div className="h-full mb-10 p-4 bg-white rounded-xl shadow-lg border border-t dark:border-none transition duration-100">
      <div className="p-4">
        {/* Title Skeleton */}
        <Skeleton.Input
          style={{ width: "60%", height: "28px", marginBottom: "15px" }}
          active
        />

        {/* Content Skeleton */}
        <Skeleton
          active
          paragraph={{ rows: 5, width: ["100%", "95%", "90%", "85%", "80%"] }}
        />

        {/* Footer Skeleton */}
        <div className="flex justify-between items-center mt-6">
          {/* Date Skeleton */}
          <Skeleton.Input style={{ width: "40%", height: "20px" }} active />
          {/* Optional Avatar Skeleton */}
          <Skeleton.Avatar style={{ width: "40px", height: "40px" }} active />
        </div>
      </div>
    </div>
  ) : (
    <div className="p-5">
      <div className="">
        <div
          className=" mb-4 
                dark:text-gray-300 text-5xl font-semibold text-center"
        >
          {blogData?.title}
        </div>
        <br />
        <div className="flex align-middle justify-center h-full ">
          <Image
            src={`${blogData?.image?.url}`}
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
          className="flex max-w-5xl mx-auto text-lg text-gray-700 p-5"
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

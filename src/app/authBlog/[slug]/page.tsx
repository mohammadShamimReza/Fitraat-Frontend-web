"use client";
import { useGetBlogsByIdQuery } from "@/redux/api/blogApi";
import { Skeleton } from "antd";
import { marked } from "marked";
import Image from "next/image";
import * as yup from "yup";
import stopPornImage from "../../assets/stopPorn.png";

const schema = yup.object().shape({
  text: yup.string().required("Review is required"),
});

function Page({ params }: { params: { slug: string } }) {
  const blogId = params.slug;
  const { data, isLoading } = useGetBlogsByIdQuery(blogId);
  const blogData = data;
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
      <br />

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
            src={blogData?.image.previewUrl || stopPornImage}
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

      <div className="text-base ">
        {/* {blogData?.review.map((review: IReview, index: number) => (
          <div key={index} className=" p-4 my-4 border rounded-xl">
            {review.text}
          </div>
        ))} */}
      </div>
      <br />
      <br />
      <br />
      {/* <form>
        <div className="mb-4">
          <label htmlFor="text" className="block  font-semibold mb-2">
            Give Review
          </label>
          <Controller
            name="text"
            render={({ field }) => (
              <textarea
                {...field}
                className="border rounded-xl w-full py-2 px-3"
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="bg-gray-200 border rounded-xl py-2 px-4 hover:bg-gray-300  dark:bg-gray-500 dark:hover:bg-slate-400 dark:text-white"
        >
          Review
        </button>
      </form> */}
    </div>
  );
}
export default Page;

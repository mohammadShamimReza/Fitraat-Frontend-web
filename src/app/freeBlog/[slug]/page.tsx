"use client";
import { useGetFreeBlogsByIdQuery } from "@/redux/api/freeBlogApi";
import { Skeleton } from "antd";
import Image from "next/image";
import * as yup from "yup";
import stopPornImage from "../../assets/stopPorn.png";

const schema = yup.object().shape({
  text: yup.string().required("Review is required"),
});

function Page({ params }: { params: { slug: string } }) {
  const blogId = params.slug;
  const { data, isLoading } = useGetFreeBlogsByIdQuery(blogId);
  const blogData = data?.data.attributes;
  console.log(blogData);

  return isLoading ? (
    Array.from({ length: 4 }).map((_, index) => (
      <Skeleton style={{ marginTop: "10px" }} key={index} active />
    ))
  ) : (
    <div className="p-5">
      <br />
      <br />
      <br />
      <div className="">
        <div
          className="text-gray-800 mb-4 
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
            <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
          )}
        </div>
      </div>
      <br />
      <p className="text-right p-20">
        Total view:{" "}
        <span className="text-red-500"> {blogData?.viewCount || 1}</span>{" "}
      </p>

      <br />
      <div className="text-2xl text-center pt-5 text-red-500 font-semibold">
        Thanks for reading this Blog
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

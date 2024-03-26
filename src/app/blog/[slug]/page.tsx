"use client";
import { useGetBlogsByIdQuery } from "@/redux/api/blogApi";
import Image from "next/image";
import Link from "next/link";
import * as yup from "yup";

const schema = yup.object().shape({
  text: yup.string().required("Review is required"),
});

function Page({ params }: { params: { slug: string } }) {
  const blogId = params.slug;
  const { data } = useGetBlogsByIdQuery(blogId);
  const blogData = data?.data.attributes;
  return (
    <div className="p-5">
      <div className="flex justify-end align-middle">
        <Link href={`/profile/`}>
          <div className="">
            <Image
              src={""}
              height={2}
              width={2}
              alt="Writer"
              className="flex w-8 h-8 rounded-full mr-2"
            />

            {/* <span>{blogData?.user.name}</span> */}
          </div>
        </Link>
      </div>
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
            src={""}
            height={200}
            width={200}
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
      <br />
      <div className="text-2xl text-center p-5">Reviews</div>
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

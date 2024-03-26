import { Blog } from "@/types/contantType";
import Image from "next/image";
import Link from "next/link";
import myPic from "../assets/myPic.png";

function Blogs({
  blog,
  isLoading,
  isSuccess,
}: {
  blog: Blog;
  isLoading: boolean;
  isSuccess: boolean;
}) {
  const blogData = blog.attributes;
  const blgoUpdateAt = new Date(blogData.updatedAt).toDateString();

  if (isLoading) {
    return (
      <div className="">
        {" "}
        <div className="h-full mb-10 p-4">
          <div
            className=" p-4 rounded-lg shadow-xl border border-t dark:border-none  mb-4 transition duration-100 transform hover:shadow-2xl 
          isDarkMode   h-72 flex flex-col justify-between"
          >
            <div className="h-full ">
              <Link href={`/blog/1`}>
                <h2
                  className="text-gray-800 mb-4 
             text-3xl font-semibold overflow-clip animate-pulse w-1/2 h-8 bg-gray-300 rounded"
                ></h2>
                <div
                  className=" mb-2
            isDarkMode   line-clamp-5 text-justify animate-pulse w-full h-4/6 bg-gray-300 rounded"
                ></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div className="">
        {" "}
        <div className="h-full mb-10 p-4">
          <div
            className=" p-4 rounded-lg shadow-xl border border-t dark:border-none  mb-4 transition duration-100 transform hover:shadow-2xl 
          isDarkMode   h-72 flex flex-col justify-between"
          >
            <div className="h-full ">
              <Link href={`/blog/1`}>
                <h2
                  className="text-gray-800 mb-4 
             text-3xl font-semibold overflow-clip"
                >
                  {blogData.title}
                </h2>
                <div
                  className=" mb-2
            isDarkMode   line-clamp-5 text-justify"
                >
                  {blogData?.content && (
                    <div
                      dangerouslySetInnerHTML={{ __html: blogData.content }}
                    />
                  )}
                </div>
              </Link>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <div className="">
                Updated At: <br />
                <span className="text-gray-900"> {blgoUpdateAt}</span>
              </div>

              <Link href={`/profile/`} className="flex items-center">
                <div>
                  <Image
                    src={myPic}
                    height={2}
                    width={2}
                    alt="Writer"
                    className="flex w-8 h-8 rounded-full mr-2"
                  />
                </div>
                <span className="text-gray-900">Shamim Reza</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blogs;

import { Blog } from "@/types/contantType";
import Image from "next/image";
import Link from "next/link";
import myPic from "../assets/myPic.png";

function Blogs({ blog }: { blog: Blog }) {
  const blogData = blog.attributes;
  const blgoUpdateAt = new Date(blogData.updatedAt).toDateString();

  return (
    <div className="">
      {" "}
      <div className="h-full mb-10 p-4 bg-white">
        <Link href={`/blog/${blog.id}`}>
          <div
            className=" p-4 rounded-xl shadow-lg border border-t dark:border-none  mb-4 transition duration-100 transform hover:shadow-2xl 
             h-72 flex flex-col justify-between"
          >
            <div className="h-full ">
              <h2
                className="text-gray-800 mb-4 
             text-3xl font-semibold overflow-clip tracking-wide"
              >
                {blogData.title}
              </h2>
              <p
                className=" mb-2
               line-clamp-5 text-justify text-gray-500"
              >
                {blogData?.content && (
                  <p dangerouslySetInnerHTML={{ __html: blogData.content }} />
                )}
              </p>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <div className="">
                Updated At: <br />
                <span className="text-gray-900"> {blgoUpdateAt}</span>
              </div>

              <Link href={`/profile/`} className="flex items-center">
                <div>
                  <Image
                    priority={false}
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
        </Link>
      </div>
    </div>
  );
}


export default Blogs;

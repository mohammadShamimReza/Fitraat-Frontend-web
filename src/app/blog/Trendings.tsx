import { useGet3TrendingBlogQuery } from "@/redux/api/blogApi";
import { Blog } from "@/types/contantType";
import Link from "next/link";

function Trendings() {
  const { data: trendingBlogData } = useGet3TrendingBlogQuery({});
  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="">
            <div className="my-4 w-full max-w-xl">
              <p className="text-center text-xl font-semibold py-10">
                Trending Blogs
              </p>
              <div className="flex flex-col items-center justify-center">
                {trendingBlogData?.data?.map((blog: Blog) => (
                  <Link key={1} href={`/blog/${blog.id}`}>
                    <div className="mb-4 hover:shadow-lg border rounded-xl  ">
                      <div className="p-4">
                        <p className="font-bold text-lg truncate">
                          {blog?.attributes.title}
                        </p>
                        <div className="mt-2  line-clamp-3  w-44 text-justify">
                          {blog?.attributes.content && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: blog.attributes.content,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <br />
      <br />
      <div className=" flex justify-end align-middle">
        <Link
          href={"/blogs"}
          className="text-center border p-5 rounded-xl text-gray-600  flex items-center gap-2   transition duration-300 transform hover:scale-110 cursor-pointer"
        >
          Read All blog
        </Link>
      </div>
      <br />
      <br /> */}
    </div>
  );
}

export default Trendings;

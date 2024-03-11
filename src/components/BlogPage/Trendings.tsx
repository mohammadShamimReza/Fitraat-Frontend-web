// import { useBlogQuery } from "@/redux/api/blogApi";

import Link from "next/link";

function Trendings() {
  // const { data: trendingBlogs } = useBlogQuery({ page: 1, limit: 3 });
  // const trendingBlog = trendingBlogs?.data;

  return (
    <div className="">
      <div className="my-4 w-full max-w-xl">
        <p className="text-center text-xl font-semibold py-10">
          Trending Blogs
        </p>
        <div className="flex flex-col items-center justify-center">
          {/* {trendingBlog?.data?.map((blog: IBlog) => ( */}
          <Link key={1} href={`/blogs/${1}`}>
            <div className="mb-4 hover:shadow-lg border rounded-lg  ">
              <div className="p-4">
                <p className="font-bold text-lg truncate">
                  Lorem ipsum dolor sit amet.
                </p>
                <div className="mt-2  line-clamp-5  w-44 text-justify">
                  {/* {blog?.content && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blog.content,
                      }}
                    />
                  )} */}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolor, illo?
                </div>
              </div>
            </div>
          </Link>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}

export default Trendings;

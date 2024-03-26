import Link from "next/link";

function Trendings() {
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
        </div>
      </div>
      <br />
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
      <br />
    </div>
  );
}

export default Trendings;

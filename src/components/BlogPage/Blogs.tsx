// import { useUsersByIdQuery } from "@/redux/api/userApi";
import Link from "next/link";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

function Blogs({ blog }: { blog: any }) {
  // const { data: userDatas } = useUsersByIdQuery(blog?.userId);

  // const userData = userDatas?.data;
  // const updatedAt = new Date(userDatas?.data?.updatedAt);

  // if (!blog) {
  //   return (
  //     <div className="">
  //       <Skeleton />
  //       <Skeleton count={5} />
  //     </div>
  //   );
  // }

  return (
    <div className="">
      {" "}
      <div className="h-72 mb-10">
        <div
          className="bg-white p-4 rounded-lg shadow-xl border border-t dark:border-none  mb-4 transition duration-100 transform hover:shadow-2xl 
          isDarkMode dark:bg-gray-800 hover:dark:shadow-slate-600 h-72 flex flex-col justify-between"
        >
          <div className="">
            <Link href={`/blog/1`}>
              <h2
                className="text-gray-800 mb-4 
            dark:text-gray-300 text-xl font-semibold overflow-clip"
              >
                {/* {blog.title} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                numquam?
              </h2>
              <p
                className=" mb-2
            isDarkMode dark:text-gray-300 truncate-ellipsis line-clamp-5"
              >
                {/* {blog?.content && (
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                )} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quaerat, repellendus perspiciatis doloribus tempora quo id esse
                mollitia sapiente recusandae dolor nemo repellat fugit, cum
                similique dolorem nisi cupiditate fugiat delectus magnam! Quos
                inventore animi deserunt aspernatur quod nobis magnam eius
                distinctio nesciunt tenetur dolores voluptas ullam odio, vitae
                eaque saepe eos debitis aliquid accusamus earum ducimus in
                cumque. Neque obcaecati inventore quas sed. Beatae quia
                repellendus, cum sunt adipisci similique!
              </p>
            </Link>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <div className="">
              Updated At <br />
              {/* {updatedAt.toLocaleString()} */}
            </div>

            <Link href={`/profile/`}>
              <div className="flex items-center">
                {/* <Image
                  src={userData?.profileImg ? userData?.profileImg : ""}
                  height={2}
                  width={2}
                  alt="Writer"
                  className="flex w-8 h-8 rounded-full mr-2"
                /> */}
              </div>
              <span>
                {/* {userData?.name} */}
                Shamim Reza
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;

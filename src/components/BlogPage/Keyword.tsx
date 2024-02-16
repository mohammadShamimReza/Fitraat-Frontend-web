"use client";

// import { useBlogQuery } from "@/redux/api/blogApi";

// import { useTypesQuery } from "@/redux/api/typeApi";

import Link from "next/link";
import { useState } from "react";
import Trendings from "./Trendings";

function Keyword() {
  const [type, setType] = useState<undefined | string>(undefined);
  const [searchTerm, setSearchTerm] = useState<undefined | string>(undefined);
  // const { data: blogDatas } = useBlogQuery({
  //   typeId: type,
  //   searchTerm: searchTerm,
  // });
  // const blogData = blogDatas?.data;
  // const { data: blogTypeDatas } = useTypesQuery({});

  return (
    <div className="">
      <div className="">
        <div className="">
          <Trendings />
        </div>
      </div>
      <br />
      <br />
      <div className=" flex justify-end align-middle">
        <Link
          href={"/blogs"}
          className="text-center border p-5 rounded-xl text-gray-600 dark:text-white flex items-center gap-2   transition duration-300 transform hover:scale-110 cursor-pointer"
        >
          Read All blog
        </Link>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Keyword;

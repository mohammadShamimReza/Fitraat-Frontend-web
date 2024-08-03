"use client";
import FancyLoading from "@/app/loading";
import Pagination from "@/components/shared/Pagination";
import { useGetPostQuery } from "@/redux/api/postApi";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import CreatePost from "./CreatePost";
import SinglePost from "./SinglePost";

function FeedPost() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(1);
  const {
    data: feedPosts,
    isLoading,
    isFetching,
  } = useGetPostQuery({ pageCount });
  const total = feedPosts?.meta.pagination.total || 0;

  const userInfoFromRedux = useAppSelector((state) => state.auth.userInfo);

  const user = userInfoFromRedux;
  const userId = userInfoFromRedux?.id;
  const varifiedSine = userInfoFromRedux?.varifiedSine;

  const posts = feedPosts?.data;
  return (
    <div className="h-full ">
      <CreatePost user={user} />
      {posts ? (
        posts.map((post) => (
          <SinglePost
            key={post.id}
            post={post}
            userId={userId}
            varifiedSine={varifiedSine}
          />
        ))
      ) : (
        <FancyLoading />
      )}
      <br />
      <Pagination
        pageCount={pageCount}
        setPageCount={setPageCount}
        total={total}
      />
    </div>
  );
}

export default FeedPost;

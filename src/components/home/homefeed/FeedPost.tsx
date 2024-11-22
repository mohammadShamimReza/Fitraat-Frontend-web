"use client";
import FancyLoading from "@/app/loading";
import { useGetPostQuery } from "@/redux/api/postApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCallback, useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import SinglePost from "./SinglePost";

function FeedPost() {
  const [pageCount, setPageCount] = useState<number>(1);
  const [allPosts, setAllPosts] = useState<any[]>([]); // State to accumulate all posts
  const dispatch = useAppDispatch();

  let Posts;
  Posts = useAppSelector((state) => state.feedSlice.data);
  let meta;
  meta = useAppSelector((state) => state.feedSlice.meta);

  if (Posts) {
    setPageCount(pageCount + 1);
  }

  console.log(Posts);

  const {
    data: feedPosts,
    isLoading,
    isFetching,
  } = useGetPostQuery({ pageCount });

  if (!Posts) {
    Posts = feedPosts?.data;
    meta = feedPosts?.meta;
  }

  const totalPosts = feedPosts?.meta.pagination.total || 0;
  const postsPerPage = 2;

  const userInfoFromRedux = useAppSelector((state) => state.auth.userInfo);
  const userId = userInfoFromRedux?.id;
  const varifiedSine = userInfoFromRedux?.varifiedSine;

  // Append new posts to the existing posts
  useEffect(() => {
    if (Posts && feedPosts) {
      setAllPosts((prevPosts) => [...prevPosts, ...feedPosts.data]);
    }
  }, [feedPosts, Posts]);

  const loadMorePosts = useCallback(() => {
    if (isFetching) return;
    const hasMorePosts = pageCount * postsPerPage < totalPosts;
    if (hasMorePosts) {
      setPageCount((prev) => prev + 1);
    }
  }, [isFetching, pageCount, totalPosts]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      loadMorePosts();
    }
  }, [loadMorePosts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className=" min-h-screen">
      <CreatePost user={userInfoFromRedux} />
      {allPosts.map((post) => (
        <SinglePost
          key={post.id}
          post={post}
          userId={userId}
          varifiedSine={varifiedSine}
        />
      ))}
      {(isLoading || isFetching) && <FancyLoading />}
    </div>
  );
}

export default FeedPost;

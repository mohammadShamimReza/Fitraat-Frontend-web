"use client";
import { useGetPostQuery } from "@/redux/api/postApi";
import { useAppSelector } from "@/redux/hooks";
import { Skeleton } from "antd";
import { useCallback, useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import SinglePost from "./SinglePost";

function FeedPost() {
  const [pageCount, setPageCount] = useState<number>(1);
  const [allPosts, setAllPosts] = useState<any[]>([]); // State to accumulate all posts

  const {
    data: feedPosts,
    isLoading,
    isFetching,
  } = useGetPostQuery({ pageCount });

  const totalPosts = feedPosts?.meta.pagination.total || 0;
  const postsPerPage = 10;

  const userInfoFromRedux = useAppSelector((state) => state.auth.userInfo);
  const userId = userInfoFromRedux?.id;
  const varifiedSine = userInfoFromRedux?.varifiedSine;

  // Append new posts to the existing posts
  useEffect(() => {
    if (feedPosts?.data) {
      setAllPosts((prevPosts) => [...feedPosts.data]);
    }
  }, [feedPosts]);

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
      {(isLoading || isFetching) && (
        <div className="flex h-screen">
          {/* Sidebar */}

          {/* Content Box */}
          <div className="flex-1 bg-white p-20 grid  gap-8">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg">
                <Skeleton
                  active
                  title={{ width: "100%" }}
                  paragraph={{ rows: 4, width: ["100%", "90%", "75%", "60%"] }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedPost;

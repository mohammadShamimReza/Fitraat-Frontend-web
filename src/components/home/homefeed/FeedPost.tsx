"use client";
import FancyLoading from "@/app/loading";
import { useGetPostQuery } from "@/redux/api/postApi";
import CreatePost from "./CreatePost";
import SinglePost from "./SinglePost";

function FeedPost() {
  const { data, isLoading, isFetching } = useGetPostQuery(undefined);

  const posts = data?.data;
  return (
    <div className="h-full ">
      <CreatePost />
      {posts ? (
        posts.map((post) => <SinglePost key={post.id} post={post} />)
      ) : (
        <FancyLoading />
      )}
    </div>
  );
}

export default FeedPost;

"use client";
import FancyLoading from "@/app/loading";
import { useGetPostQuery } from "@/redux/api/postApi";
import { useAppSelector } from "@/redux/hooks";
import CreatePost from "./CreatePost";
import SinglePost from "./SinglePost";

function FeedPost() {
  const { data, isLoading, isFetching } = useGetPostQuery(undefined);

  const userInfoFromRedux = useAppSelector((state) => state.auth.userInfo);

  console.log(userInfoFromRedux);

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

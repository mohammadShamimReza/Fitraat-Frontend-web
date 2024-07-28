"use client";
import FancyLoading from "@/app/loading";
import { useGetPostQuery } from "@/redux/api/postApi";
import { useAppSelector } from "@/redux/hooks";
import CreatePost from "./CreatePost";
import SinglePost from "./SinglePost";

function FeedPost() {
  const { data, isLoading, isFetching } = useGetPostQuery(undefined);

  const userInfoFromRedux = useAppSelector((state) => state.auth.userInfo);

  const user = userInfoFromRedux;
  const userId = userInfoFromRedux?.id;

  const posts = data?.data;
  return (
    <div className="h-full ">
      <CreatePost user={user} />
      {posts ? (
        posts.map((post) => (
          <SinglePost key={post.id} post={post} userId={userId} />
        ))
      ) : (
        <FancyLoading />
      )}
    </div>
  );
}

export default FeedPost;

import { useGetPostQuery } from "@/redux/api/postApi";
import CreatePost from "./CreatePost";
import SinglePost from "./SinglePost";

function FeedPost() {
  const { data, isLoading, isFetching } = useGetPostQuery(undefined);

  const posts = data?.data;
  console.log(posts ? posts[0] : "");
  return (
    <div className="h-screen ">
      <CreatePost />
      {posts
        ? posts.map((post) => <SinglePost key={post.id} post={post} />)
        : "null"}
    </div>
  );
}

export default FeedPost;

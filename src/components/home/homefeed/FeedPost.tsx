import CreatePost from "./CreatePost";
import SinglePost from "./SinglePost";

function FeedPost() {
  return (
    <div className="h-screen ">
      <CreatePost />
      <SinglePost />
    </div>
  );
}

export default FeedPost;

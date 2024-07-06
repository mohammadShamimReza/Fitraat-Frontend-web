import { CiHeart } from "react-icons/ci";
import { IoHeart } from "react-icons/io5";

const PostActions = ({
  totalLikes,
  likedPostForCurrentUser,
  handleLikeUnlickClick,
}: {
  totalLikes: number;
  likedPostForCurrentUser: boolean;
  handleLikeUnlickClick: () => void;
}) => {
  return (
    <div className="flex justify-between items-center mt-4 relative">
      <button
        className="flex items-center text-gray-600"
        onClick={handleLikeUnlickClick}
      >
        <div className="ml-4 absolute">
          {likedPostForCurrentUser ? (
            <IoHeart style={{ color: "red" }} size={30} />
          ) : (
            <CiHeart style={{ color: "red" }} size={30} />
          )}
        </div>
        <p className="ml-14 text-base text-gray-500">
          {likedPostForCurrentUser && "you and"} {totalLikes}{" "}
          {likedPostForCurrentUser ? "Liked" : "Like"}{" "}
        </p>
      </button>
    </div>
  );
};

export default PostActions;

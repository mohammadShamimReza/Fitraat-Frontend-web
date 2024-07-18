import { CiHeart } from "react-icons/ci";
import { IoHeart } from "react-icons/io5";
import { TfiComment } from "react-icons/tfi";

const PostActions = ({
  totalLikes,
  likedPostForCurrentUser,
  handleLikeUnlickClick,
  totalComment,
}: {
  totalLikes: number;
  likedPostForCurrentUser: boolean;
  handleLikeUnlickClick: () => void;
  totalComment: number;
}) => {
  const currentLike = totalLikes - 1;
  return (
    <div className="flex justify-between items-center mt-4 relative">
      <button className="flex items-center text-gray-600">
        <div className="ml-4 absolute" onClick={handleLikeUnlickClick}>
          {likedPostForCurrentUser ? (
            <IoHeart style={{ color: "red" }} size={30} />
          ) : (
            <CiHeart size={30} />
          )}
        </div>
        <p className="ml-14 text-base text-gray-500 ">{totalLikes} </p>
        <p className="flex align-middle items-center gap-2 pl-3 ml-5">
          {" "}
          <TfiComment size={20} />
          {totalComment}
        </p>
      </button>
    </div>
  );
};

export default PostActions;

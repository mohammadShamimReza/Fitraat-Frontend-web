import { TfiComment } from "react-icons/tfi";

const PostActions = ({
  totalComment,
  userId,
}: {
  totalComment: number;
  userId: number | undefined;
}) => {
  return (
    <div className=" flex justify-end mt-4 ">
      <p className="flex align-middle items-center gap-2 pl-3 ml-5">
        <TfiComment size={20} />
        {totalComment}
      </p>
    </div>
  );
};

export default PostActions;

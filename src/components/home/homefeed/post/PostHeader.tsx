import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const PostHeader = ({
  postUserId,
  postUserName,
  postAt,
  varifiedSine,
}: {
  postUserId: number;
  postUserName: string;
  postAt: string;

  varifiedSine: boolean | undefined;
}) => {
  return (
    <div className="flex items-center mb-4">
      <Link href={`/postUser/${postUserId}`}>
        <div className="flex">
          <div className="">
            <p className="text-2xl text-blue-500 font-bold flex items-center gap-2">
              {postUserName} {varifiedSine ? <FaCheckCircle size={15} /> : ""}
            </p>
            <p className="text-gray-600 text-sm">{postAt}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostHeader;

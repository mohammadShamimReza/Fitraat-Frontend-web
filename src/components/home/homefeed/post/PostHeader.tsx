import Link from "next/link";

const mockData = {
  userImage: "https://via.placeholder.com/150",
};

const PostHeader = ({
  userId,
  postUserName,
  postAt,
}: {
  userId: number;
  postUserName: string;
  postAt: string;
}) => {
  return (
    <div className="flex items-center mb-4">
      <Link href={`/postUser/${userId}`}>
        <div className="flex">
          <img
            src={mockData.userImage}
            alt="User image"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="ml-3">
            <p>{postUserName}</p>
            <p className="text-gray-600 text-sm">{postAt}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostHeader;

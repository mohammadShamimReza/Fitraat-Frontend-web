import PostContent from "@/components/home/homefeed/post/PostContent";
import { Key } from "react";

interface UserPostsProps {
  postsByUser: any;
  showPostModal: (post: any) => void;
  showDeleteModal: (postId: any) => void;
  compliteDay: number;
  progressData: { day: number; completed: boolean }[];
}

const UserPosts: React.FC<UserPostsProps> = ({
  postsByUser,
  showPostModal,
  showDeleteModal,
  compliteDay,
  progressData,
}) => {
  return (
    <>
      <div className={`bg-white border rounded-lg p-6 mt-8`}>
        <h1 className="text-3xl font-semibold text-center mb-4 ">
          My <span className="text-blue-500"> posts </span>
        </h1>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {postsByUser?.map(
            (data: {
              id: Key | null | undefined;
              attributes: { description: string };
            }) => (
              <div
                className="border p-2 m-2 relative flex flex-col justify-between h-full"
                key={data.id}
              >
                <div className="flex-grow">
                  <PostContent postDescription={data.attributes.description} />
                </div>
                <div className="flex justify-between gap-2 mt-2">
                  <button
                    className={`px-4 py-2 rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
                    onClick={() => showPostModal(data)}
                  >
                    Edit post
                  </button>
                  <button
                    className={`px-4 py-2 rounded-xl focus:outline-none bg-red-400 hover:bg-red-500 text-white`}
                    onClick={() => showDeleteModal(data.id)} // Show delete confirmation modal
                  >
                    Delete post
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className={`bg-white border rounded-lg p-6 mt-8`}>
        <h1 className="text-3xl font-semibold text-center mb-4 underline">
          Remaining: <span className="text-blue-500">{40 - compliteDay} </span>
          Days
        </h1>
        <br />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-1">
          {progressData.map((data, index) => (
            <div
              key={index}
              className={`p-2 text-center border border-gray-400 ${
                data.completed
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-gray-300"
              }`}
            >
              <p className="font-semibold">{data.day}</p>
              <p className="text-xs mt-1">
                {data.completed ? "Completed" : "Incomplete"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserPosts;

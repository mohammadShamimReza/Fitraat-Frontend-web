import { Input, Modal } from "antd";
import { useState } from "react";

const { TextArea } = Input;

interface Comment {
  userName: string;
  userImage: string;
  content: string;
}

const PostComments = ({
  comments,
  setComments,
}: {
  comments: any;
  setComments: any;
}) => {
  const [newComment, setNewComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          userName: "Current User",
          userImage: "https://via.placeholder.com/50",
          content: newComment,
        },
      ]);
      setNewComment("");
    }
  };

  return (
    <>
      <div className="my-4">
        {comments.length > 0 ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <div className="flex items-start mb-2">
              <img
                src={comments[0].userImage}
                alt="User image"
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{comments[0].userName}</p>
                <p>{comments[0].content}</p>
              </div>
            </div>
            <button
              className="text-blue-500 mt-2"
              onClick={() => setModalVisible(true)}
            >
              Show More Comments
            </button>
          </>
        ) : (
          <h3 className="text-lg font-semibold mb-2">No Comments</h3>
        )}
        <TextArea
          className="mt-4"
          rows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700"
        >
          <span style={{ paddingRight: "10px" }}> Post Comment</span>
        </button>
      </div>
      <Modal
        title="All Comments"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <div className="mb-4">
          {comments.map((comment: any, index: any) => (
            <div key={index} className="flex items-start mb-2">
              <img
                src={comment.userImage}
                alt="User image"
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{comment.userName}</p>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
        <TextArea
          rows={2}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          className={`px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700`}
          onClick={() => {
            handleAddComment();
            setModalVisible(false);
          }}
        >
          <span style={{ paddingRight: "10px" }}> Post Comment</span>
        </button>
      </Modal>
    </>
  );
};

export default PostComments;

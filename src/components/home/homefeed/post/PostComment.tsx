import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/redux/api/commentApi";
import { singleCommentForPostData } from "@/types/contantType";
import { Input, message, Modal } from "antd";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";

const mockData = {
  userImage: "https://via.placeholder.com/150",
};

const { TextArea } = Input;

const PostComments = ({
  postId,
  postComment,
  userId,
  varifiedSine,
}: {
  postId: number;
  postComment: singleCommentForPostData[] | undefined;
  userId: number | undefined;
  varifiedSine: boolean | undefined;
}) => {
  const currentUserId = userId || 0;
  const [newComment, setNewComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalComment, setModalComment] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false); // State for edit modal visibility
  const [editCommentId, setEditCommentId] = useState<number | null>(null); // State to store the comment id being edited
  const [editCommentText, setEditCommentText] = useState(""); // State to store the edited comment text
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  // Helper function to check if a comment is valid
  const isValidComment = (comment: string) => {
    return /\w/.test(comment); // Check for at least one word character
  };

  const handleAddComment = async () => {
    if (!currentUserId) {
      return message.info("Please log in first to comment");
    }
    if (!isValidComment(newComment)) {
      return message.info("Please write a valid comment");
    }
    try {
      await createComment({
        data: { user: currentUserId, post: postId, comment: newComment },
      });
      setNewComment(""); // Clear the comment input after successful addition
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleModalAddComment = async () => {
    setModalVisible(false);
    setEditModalVisible(false);
    if (!isValidComment(modalComment)) {
      return message.info("Please write a valid comment");
    }
    try {
      const result = await createComment({
        data: { user: currentUserId, post: postId, comment: modalComment },
      });
      if (result) {
        message.success("Comment successfull");
      } else {
        message.info("Something went wrong. Try again leter");
      }
      setModalComment(""); // Clear the modal comment input after successful addition
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const result = await deleteComment({ postId: commentId });
      if (result) {
        message.success("Comment deleted successfully");
      } else {
        message.info("Something went wrong. Try again leter");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleUpdateComment = async () => {
    setEditModalVisible(false); // Close the edit modal after successful update
    if (editCommentId && isValidComment(editCommentText)) {
      try {
        await updateComment({
          commentId: editCommentId,
          data: {
            comment: editCommentText,
          },
        });
      } catch (error) {
        console.error("Error updating comment:", error);
        message.error("Sorry for the technical issue, try again later");
      }
    } else {
      message.info("Please write a valid comment");
    }
  };

  const renderDropdownMenu = (commentId: number) => {
    if (editModalVisible) return null;

    return (
      <div className="dropdown-menu absolute z-10 right-0 w-32 bg-white shadow-lg rounded-lg border">
        <button
          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          onClick={() => {
            const commentToEdit = postComment?.find(
              (comment) => comment.id === commentId
            );
            if (commentToEdit) {
              setEditCommentId(commentId);
              setEditCommentText(commentToEdit.attributes.comment);
              setEditModalVisible(true);
              setModalVisible(false);
            }
          }}
        >
          Edit
        </button>
        <button
          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          onClick={() => handleDeleteComment(commentId)}
        >
          Delete
        </button>
      </div>
    );
  };

  if (postComment) {
    return (
      <>
        <div className="mt-10">
          {postComment.length > 0 ? (
            <>
              {postComment.slice(0, 1).map((comment) => (
                <div
                  className="flex justify-between items-start align-middle mb-2 p-3 shadow rounded-lg"
                  key={comment.id}
                >
                  <div className="flex gap-3 items-center ">
                    <div className="">
                      <p className="font-semibold flex items-center gap-2">
                        {comment.attributes.user.data.attributes.username}
                        {varifiedSine ? (
                          <FaCheckCircle className="text-blue-500" size={15} />
                        ) : (
                          ""
                        )}
                      </p>
                      <p>{comment.attributes.comment}</p>
                    </div>
                  </div>
                  {currentUserId === comment.attributes.user.data.id && (
                    <div className="relative">
                      <HiDotsHorizontal
                        size={20}
                        className="cursor-pointer border rounded-full relative"
                        onClick={() =>
                          setDropdownVisible(
                            dropdownVisible === comment.id ? null : comment.id
                          )
                        }
                      />
                      {dropdownVisible === comment.id &&
                        renderDropdownMenu(comment.id)}
                    </div>
                  )}
                </div>
              ))}
              <button
                className="text-blue-500 mt-2 mb-5"
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
            className={`mt-3 px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700 ${
              isValidComment(newComment)
                ? " cursor-pointer"
                : " cursor-not-allowed"
            }`}
            disabled={!isValidComment(newComment)} // Disable button if comment is not valid
          >
            <span style={{ paddingRight: "10px" }}>Post Comment</span>
          </button>
        </div>
        <Modal
          title="All Comments"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <div className="mb-4 h-80 overflow-scroll border p-3 rounded">
            {postComment.slice(1).map((comment) => (
              <div
                key={comment.id}
                className="flex items-start justify-between mb-2 shadow-sm rounded-lg border p-3"
              >
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    {comment.attributes.user.data.attributes.username}{" "}
                    {varifiedSine ? (
                      <FaCheckCircle className="text-blue-500" size={15} />
                    ) : (
                      ""
                    )}
                  </p>
                  <p>{comment.attributes.comment}</p>
                </div>
                {currentUserId === comment.attributes.user.data.id && (
                  <div className="relative">
                    <HiDotsHorizontal
                      size={20}
                      className="cursor-pointer border rounded-full relative"
                      onClick={() =>
                        setDropdownVisible(
                          dropdownVisible === comment.id ? null : comment.id
                        )
                      }
                    />
                    {dropdownVisible === comment.id &&
                      renderDropdownMenu(comment.id)}
                  </div>
                )}
              </div>
            ))}
          </div>
          <br />
          <TextArea
            rows={2}
            value={modalComment}
            onChange={(e) => setModalComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            className={`px-4 mt-3 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700${
              isValidComment(modalComment)
                ? " cursor-pointer"
                : " cursor-not-allowed"
            }`}
            onClick={handleModalAddComment}
            disabled={!isValidComment(modalComment)} // Disable button if modal comment is not valid
          >
            <span style={{ paddingRight: "10px" }}>Post Comment</span>
          </button>
        </Modal>
        {/* Edit Modal */}
        <Modal
          title="Edit Comment"
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          footer={[
            <button
              key="cancel"
              onClick={() => {
                setEditModalVisible(false);
                setEditCommentId(null);
                setEditCommentText("");
              }}
              className="px-4 py-2 mr-2 text-white rounded focus:outline-none bg-gray-400 hover:bg-gray-500 cursor-pointer"
            >
              Cancel
            </button>,
            <button
              key="submit"
              onClick={handleUpdateComment}
              className={`px-4 py-2 text-white rounded focus:outline-none ${
                isValidComment(editCommentText)
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
              disabled={!isValidComment(editCommentText)} // Disable button if edit comment is not valid
            >
              Update
            </button>,
          ]}
        >
          <TextArea
            rows={4}
            value={editCommentText}
            onChange={(e) => setEditCommentText(e.target.value)}
            placeholder="Edit your comment..."
          />
        </Modal>
      </>
    );
  } else {
    return null;
  }
};

export default PostComments;

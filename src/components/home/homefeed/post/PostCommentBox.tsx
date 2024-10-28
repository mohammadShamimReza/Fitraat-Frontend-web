import TextArea from "antd/es/input/TextArea";
import { Dispatch, SetStateAction } from "react";

function PostCommentBox({
  newComment,
  setNewComment,
  handleAddComment,
}: {
  newComment: string;
  setNewComment: Dispatch<SetStateAction<string>>;
  handleAddComment: () => void;
}) {
  return (
    <div>
      {" "}
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
        <span style={{ paddingRight: "10px" }}>Post Comment</span>
      </button>
    </div>
  );
}

export default PostCommentBox;

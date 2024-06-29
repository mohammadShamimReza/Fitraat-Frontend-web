"use client";
import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { IoHeart, IoSave } from "react-icons/io5";

const { TextArea } = Input;

interface Comment {
  userName: string;
  userImage: string;
  content: string;
}

function SinglePost() {
  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const handleLikeClick = () => {
    !like && setShowLikeAnimation(true);
    setLike(!like);

    setTimeout(() => {
      setShowLikeAnimation(false);
    }, 500);
  };

  const handleSaveClick = () => {
    !save && setShowSaveAnimation(true);
    setSave(!save);

    setTimeout(() => {
      setShowSaveAnimation(false);
    }, 500);
  };

  const mockData = {
    userName: "Shamim Reza",
    userImage: "https://via.placeholder.com/150",
    postTime: "1 hour ago",
    postContent: `
      <p>This is a <strong>blog post</strong> with <em>HTML</em> content. It might include various <a href="#">HTML tags</a>.</p>
      <p>More content to show in the preview. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis.</p>
      <p>Here is the third paragraph to ensure the content spans more than six lines.</p>
      <p>Another line of text for the preview.</p>
      <p>Yet another line of text to fill the six-line limit.</p>
      <p>The final line to display in the preview mode before "See More" is shown.</p> <p>This is a <strong>blog post</strong> with <em>HTML</em> content. It might include various <a href="#">HTML tags</a>.</p>
      <p>More content to show in the preview. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis.</p>
      <p>Here is the third paragraph to ensure the content spans more than six lines.</p>
      <p>Another line of text for the preview.</p>
      <p>Yet another line of text to fill the six-line limit.</p>
      <p>The final line to display in the preview mode before "See More" is shown.</p>
    `,
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          userName: "Current User", // Replace with the current user's name
          userImage: "https://via.placeholder.com/50", // Replace with the current user's image
          content: newComment,
        },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="flex justify-center p-5">
      <div className="max-w-sm w-full lg:max-w-full lg:flex">
        <div className="border rounded-2xl shadow-lg flex flex-col justify-between leading-normal bg-white p-8">
          <div className="flex items-center mb-4">
            <img
              src={mockData.userImage}
              alt="User image"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="ml-3">
              <p>{mockData.userName}</p>
              <p className="text-gray-600 text-sm ">{mockData.postTime}</p>
            </div>
          </div>
          <div className="mb-4">
            <div
              className={`prose overflow-hidden transition-all duration-500 ease-in-out small-regular leading-7 tracking-wider text-base ${
                expanded ? "animate-expand" : "line-clamp-6 animate-collapse"
              }`}
              dangerouslySetInnerHTML={{ __html: mockData.postContent }}
            />
            {!expanded ? (
              <button
                className="text-blue-500 mt-2"
                onClick={() => setExpanded(true)}
              >
                See More
              </button>
            ) : (
              <button
                className="text-blue-500 mt-2"
                onClick={() => setExpanded(false)}
              >
                Show Less
              </button>
            )}
          </div>
          <div className="mb-4">
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
              className={
                "mt-2 px-4 py-2 text-white rounded focus:outline-none bg-gray-600 hover:bg-gray-700"
              }
            >
              <span style={{ paddingRight: "10px" }}> Post Comment</span>
            </button>
          </div>
          <div className="flex justify-between items-center mt-4 relative">
            <button
              className="flex items-center text-gray-600"
              onClick={handleLikeClick}
            >
              {showLikeAnimation ? (
                <img
                  src="/likeAnimation.gif"
                  alt="like animation"
                  className=" h-16 w-16 absolute z-10"
                />
              ) : (
                <div className="ml-4 absolute">
                  {like ? (
                    <IoHeart style={{ color: "red" }} size={30} />
                  ) : (
                    <CiHeart style={{ color: "red" }} size={30} />
                  )}
                </div>
              )}
              <p className="ml-14 text-base text-gray-500">
                {like ? "Liked" : "Like"}{" "}
              </p>
            </button>
            <button
              className="flex items-center text-base text-gray-500"
              onClick={handleSaveClick}
            >
              {showSaveAnimation ? (
                <img
                  src="/saveAnimation.gif"
                  alt="like animation"
                  className=" h-16 w-16 absolute z-10"
                />
              ) : (
                <div className="ml-2 absolute">
                  {save ? <IoSave size={30} /> : <AiOutlineSave size={30} />}
                </div>
              )}
              <p className="ml-12 text-base text-gray-500">
                {save ? "Saved" : "Save"}{" "}
              </p>
            </button>
          </div>
        </div>
      </div>
      <Modal
        title="All Comments"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <div className="mb-4">
          {comments.map((comment, index) => (
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
          className={`px-4 py-2 text-white rounded focus:outline-none ${"bg-gray-600 hover:bg-gray-700"}`}
        >
          <span style={{ paddingRight: "10px" }}> Post Comment</span>
          Previous
        </button>
        <Button
          type="primary"
          className="mt-2"
          onClick={() => {
            handleAddComment();
            setModalVisible(false);
          }}
        ></Button>
      </Modal>
    </div>
  );
}

export default SinglePost;

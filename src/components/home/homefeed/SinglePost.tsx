"use client";
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetLikeOfPostQuery,
  usePostLikeForCurrentUserQuery,
} from "@/redux/api/likeApi";
import { Post } from "@/types/contantType";
import { Input, Modal, message } from "antd";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoHeart } from "react-icons/io5";

const { TextArea } = Input;

interface Comment {
  userName: string;
  userImage: string;
  content: string;
}

function SinglePost({ post }: { post: Post }) {
  const [createLike, { isError, isLoading, isSuccess }] =
    useCreateLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const { data: postLike } = useGetLikeOfPostQuery({ postId: post?.id });
  const { data: postLikeForCurrentUser } = usePostLikeForCurrentUserQuery({
    postId: post?.id,
    userId: 10,
  });
  const totlaLike = postLike?.meta.pagination.total;
  const postDescription = post.attributes.description
    .map((desc) => desc.children.map((chil) => chil.text))
    .flat();
  const postUserName = post.attributes.user.data.attributes.username;
  const postAt = formatDistanceToNow(new Date(post.attributes.createdAt), {
    addSuffix: true,
  });
  const userId = post.attributes.user.data.id;
  const postId = post.id;

  const likedPostForCurrentUser =
    postLikeForCurrentUser?.meta.pagination.total === 0 ? false : true;

  const postLikeForCurrentUserId = postLikeForCurrentUser?.data[0]?.id;

  console.log(postLikeForCurrentUser);

  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  // const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  // const [showSaveAnimation, setShowSaveAnimation] = useState(false);
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const { clientHeight, scrollHeight } = textRef.current;
      if (scrollHeight > clientHeight) {
        setIsClamped(true);
      }
    }
  }, []);

  const handleLikeUnlickClick = async () => {
    if (likedPostForCurrentUser && postLikeForCurrentUserId) {
      const result = await deleteLike({
        postLikeForCurrentUserId: postLikeForCurrentUserId,
      });
      console.log(result, "deleteLike");
    } else if (!likedPostForCurrentUser) {
      try {
        const result = await createLike({ data: { user: 10, post: postId } });
        console.log(result, "create Like");
        if (isSuccess) {
          message.success("Thanks for like the post!");
        } else if (isError) {
          message.error("Something went wrong. Please try again later");
        }
      } catch (error) {
        message.error("Something went wrong. Please try again later");
      } finally {
      }
    }

    // !like && setShowLikeAnimation(true);
    // setLike(!like);

    // setTimeout(() => {
    //   setShowLikeAnimation(false);
    // }, 500);
  };

  // const handleSaveClick = () => {
  //   !save && setShowSaveAnimation(true);
  //   setSave(!save);

  //   setTimeout(() => {
  //     setShowSaveAnimation(false);
  //   }, 500);
  // };

  const mockData = {
    userImage: "https://via.placeholder.com/150",
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
        <div className="border rounded-2xl w-full shadow-lg flex flex-col justify-between leading-normal bg-white p-8">
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
                  <p className="text-gray-600 text-sm ">{postAt}</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="mb-4">
            <div
              ref={textRef}
              className={`prose overflow-hidden transition-all duration-700 ease-in-out small-regular leading-7 tracking-wider text-base ${
                expanded ? "max-h-full" : "max-h-40"
              }`}
              dangerouslySetInnerHTML={{ __html: postDescription }}
              style={{
                maxHeight: expanded
                  ? `${textRef.current?.scrollHeight}px`
                  : "160px", // 160px corresponds to max-h-40
              }}
            />
            {isClamped && (
              <button
                className="text-blue-500 mt-5"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show Less" : "See More"}
              </button>
            )}
          </div>

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
                {likedPostForCurrentUser && "you and"} {totlaLike}{" "}
                {likedPostForCurrentUser ? "Liked" : "Like"}{" "}
              </p>
            </button>
            {/* <button
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
            </button> */}
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
          onClick={() => {
            handleAddComment();
            setModalVisible(false);
          }}
        >
          <span style={{ paddingRight: "10px" }}> Post Comment</span>
        </button>
      </Modal>
    </div>
  );
}

export default SinglePost;

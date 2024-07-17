"use client";
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetLikeOfPostQuery,
  usePostLikeForCurrentUserQuery,
} from "@/redux/api/likeApi";
import { Post } from "@/types/contantType";
import PostContent from "./post/PostContent";
import PostHeader from "./post/PostHeader";

import {
  useCreateCommentMutation,
  useGetCommentOfPostQuery,
} from "@/redux/api/commentApi";
import { message } from "antd";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import PostActions from "./post/PostAction";
import PostComments from "./post/PostComment";

function SinglePost({ post }: { post: Post }) {
  const [createLike] = useCreateLikeMutation();
  const [createComment] = useCreateCommentMutation();

  const [deleteLike] = useDeleteLikeMutation();
  const { data: postLike } = useGetLikeOfPostQuery({ postId: post?.id });
  const { data: postLikeForCurrentUser } = usePostLikeForCurrentUserQuery({
    postId: post?.id,
    userId: 10,
  });
  const { data: postComments } = useGetCommentOfPostQuery({ postId: post?.id });

  const postComment = postComments?.data;
  const totalComment = postComments?.meta.pagination.total || 0;

  const totalLikes = postLike?.meta.pagination.total || 0;
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
    postLikeForCurrentUser?.meta.pagination.total !== 0;

  const postLikeForCurrentUserId = postLikeForCurrentUser?.data[0]?.id;

  const handleLikeUnlickClick = async () => {
    if (likedPostForCurrentUser && postLikeForCurrentUserId) {
      try {
        const result = await deleteLike({ postLikeForCurrentUserId });
        if (!result) {
          message.error("something went wrong, try again later");
        }
      } catch (error) {
        message.error("something went wrong, try again later");
      }
    } else if (!likedPostForCurrentUser) {
      try {
        const result = await createLike({ data: { user: 10, post: postId } });
        if (!result) {
          message.error("something went wrong, try again later");
        } else if (result) {
          message.success("Thanks for like the post");
        }
      } catch (error) {
        message.error("something went wrong, try again later");
      }
    }
  };
  const [newComment, setNewComment] = useState("");
  const handleAddComment = async () => {
    console.log("New comment:", newComment);
    console.log("Post ID:", postId);

    try {
      const result = await createComment({
        data: { user: 10, post: postId, comment: newComment },
      });
      console.log("Comment added:", result);
      setNewComment(""); // Clear the comment input after successful addition
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="flex justify-center p-5">
      <div className="w-full lg:max-w-full lg:flex">
        <div className="border rounded-2xl w-full shadow-lg flex flex-col justify-between leading-normal bg-white p-8">
          <PostHeader
            userId={userId}
            postUserName={postUserName}
            postAt={postAt}
          />
          <PostContent postDescription={postDescription} />
          <PostActions
            totalLikes={totalLikes}
            likedPostForCurrentUser={likedPostForCurrentUser}
            handleLikeUnlickClick={handleLikeUnlickClick}
            totalComment={totalComment}
          />
          <PostComments postId={postId} postComment={postComment} />

          {/* <PostCommentBox
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default SinglePost;

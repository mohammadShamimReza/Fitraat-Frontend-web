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

function SinglePost({
  post,
  userId,
  varifiedSine,
}: {
  post: Post;
  userId: number | undefined;
  varifiedSine: boolean | undefined;
}) {
  const [createLike] = useCreateLikeMutation();
  const [createComment] = useCreateCommentMutation();

  const [deleteLike] = useDeleteLikeMutation();
  const { data: postLike } = useGetLikeOfPostQuery({ postId: post?.id });
  const { data: postLikeForCurrentUser } = usePostLikeForCurrentUserQuery({
    postId: post?.id,
    userId: userId || 0,
  });
  const { data: postComments } = useGetCommentOfPostQuery({ postId: post?.id });

  const postComment = postComments?.data;
  const totalComment = postComments?.meta.pagination.total || 0;

  const totalLikes = postLike?.meta.pagination.total || 0;
  const postDescription = post.attributes.description;
  const postUserName = post.attributes.user.data.attributes.username;
  const postAt = formatDistanceToNow(new Date(post.attributes.createdAt), {
    addSuffix: true,
  });
  const postUserId = post.attributes.user.data.id;
  const postId = post.id;

  const likedPostForCurrentUser =
    postLikeForCurrentUser?.meta.pagination.total !== 0;

  const postLikeForCurrentUserId = postLikeForCurrentUser?.data[0]?.id;

  const handleLikeUnlickClick = async () => {
    if (!userId) {
      return message.info("Please login first for like this post");
    }

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
        const result = await createLike({
          data: { user: userId, post: postId },
        });
        if (!result) {
          message.error("something went wrong, try again later");
        }
      } catch (error) {
        message.error("something went wrong, try again later");
      }
    }
  };
  const [newComment, setNewComment] = useState("");

  // const handleAddComment = async () => {
  //   try {
  //     const result = await createComment({
  //       data: { user: 10, post: postId, comment: newComment },
  //     });
  //     console.log("Comment added:", result);
  //     setNewComment(""); // Clear the comment input after successful addition
  //   } catch (error) {
  //     console.error("Error adding comment:", error);
  //   }
  // };

  return (
    <div className="flex justify-center p-5">
      <div className="w-full lg:max-w-full lg:flex">
        <div className="border rounded-2xl w-full shadow-lg flex flex-col justify-between leading-normal bg-white p-8">
          <PostHeader
            postUserId={postUserId}
            postUserName={postUserName}
            postAt={postAt}
            varifiedSine={varifiedSine}
          />
          <PostContent postDescription={postDescription} />
          <PostActions
            totalLikes={totalLikes}
            likedPostForCurrentUser={likedPostForCurrentUser}
            handleLikeUnlickClick={handleLikeUnlickClick}
            totalComment={totalComment}
            userId={userId}
          />
          <PostComments
            postId={postId}
            postComment={postComment}
            userId={userId}
            varifiedSine={varifiedSine}
          />
        </div>
      </div>
    </div>
  );
}

export default SinglePost;

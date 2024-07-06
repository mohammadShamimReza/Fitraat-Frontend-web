"use client";
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetLikeOfPostQuery,
  usePostLikeForCurrentUserQuery,
} from "@/redux/api/likeApi";
import { Post } from "@/types/contantType";
import { useState } from "react";
import PostContent from "./post/PostContent";
import PostHeader from "./post/PostHeader";

import { formatDistanceToNow } from "date-fns";
import PostActions from "./post/PostAction";
import PostComments from "./post/PostComment";

function SinglePost({ post }: { post: Post }) {
  const [createLike] = useCreateLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const { data: postLike } = useGetLikeOfPostQuery({ postId: post?.id });
  const { data: postLikeForCurrentUser } = usePostLikeForCurrentUserQuery({
    postId: post?.id,
    userId: 10,
  });

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

  const [comments, setComments] = useState<Comment[]>([]);

  const handleLikeUnlickClick = async () => {
    if (likedPostForCurrentUser && postLikeForCurrentUserId) {
      await deleteLike({ postLikeForCurrentUserId });
    } else if (!likedPostForCurrentUser) {
      await createLike({ data: { user: 10, post: postId } });
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
          <PostComments comments={comments} setComments={setComments} />
          <PostActions
            totalLikes={totalLikes}
            likedPostForCurrentUser={likedPostForCurrentUser}
            handleLikeUnlickClick={handleLikeUnlickClick}
          />
        </div>
      </div>
    </div>
  );
}

export default SinglePost;

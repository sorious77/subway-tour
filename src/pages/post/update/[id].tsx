import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useGetPost, useUpdatePostMutation } from "queries/posts";
import { MutatePost, Post } from "types/posts";
import PostInputForm from "components/PostInputForm";

const Update = () => {
  const router = useRouter();

  const getDate = (timestamp: string | undefined) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);

    const month =
      date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;

    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  };

  const { id } = router.query as { id: string };

  const usePostForm = useForm<MutatePost>();

  const { data: post } = useGetPost(id, {
    onSuccess: (data: Post) => {
      const { setValue } = usePostForm;

      setValue("title", data.title);
      setValue("station_nm", data.station_nm);
      setValue("visitedAt", getDate(post?.visitedAt));
      setValue("content", data.content);
    },
  });

  const { mutate: updatePostMutate } = useUpdatePostMutation();

  const handleUpdatePost = useCallback(
    (data: MutatePost) => {
      updatePostMutate(
        {
          ...data,
          id,
        },
        {
          onSuccess: (result) => router.push(`/post/${result.id}`),
        }
      );
    },
    [updatePostMutate]
  );

  return (
    <PostInputForm
      handlePostSubmit={handleUpdatePost}
      usePostForm={usePostForm}
    />
  );
};

export default Update;

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MutatePost } from "types/posts";
import { useWritePostMutation } from "queries/posts";
import PostInputForm from "components/PostInputForm";

const Write = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const usePostForm = useForm<MutatePost>();

  const { mutate: writePostMutate } = useWritePostMutation();

  const handleWritePost = useCallback(
    (data: MutatePost) => {
      writePostMutate(
        {
          ...data,
          author: session?.user?.user.email,
        },
        {
          onSuccess: (result) => router.push(`/post/${result.id}`),
        }
      );
    },
    [writePostMutate]
  );

  return (
    <PostInputForm
      handlePostSubmit={handleWritePost}
      usePostForm={usePostForm}
    />
  );
};

export default Write;

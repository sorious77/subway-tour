import Link from "next/link";
import { useRouter } from "next/router";
import { useDeletePostMutation, useGetPost } from "queries/posts";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

const Post = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { id } = router.query;

  const {
    data: post,
    isLoading,
    isError,
  } = useGetPost(id as string, {
    onSuccess: (data) => {
      if (!data) {
        alert("존재하지 않는 게시글입니다.");
        router.push("/list");
      }
    },
  });

  const getDate = (timestamp: string) => {
    const date = new Date(timestamp);

    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      handleDeletePost(post!.id);
    }
  };

  const { mutate: deletePostMutate } = useDeletePostMutation();

  const handleDeletePost = useCallback(
    (id: string) => {
      deletePostMutate(id, {
        onSuccess: (result) => router.push("/list"),
        onError: (error) => console.log("hi"),
      });
    },
    [deletePostMutate]
  );

  const handleUpdate = () => {
    router.push(`/post/update/${post?.id}`);
  };

  return (
    <div className="relative flex flex-col items-center px-10 py-10 mt-10 whitespace-pre-line dark:bg-zinc-700">
      <div className="w-1/2">
        <div className="flex items-center justify-between mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              router.push("/list");
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          {session?.user?.user?.nickname === post?.user.nickname && (
            <div className="flex justify-between w-40">
              <button
                className="w-16 p-2 text-white rounded bg-rose-400 dark:bg-white dark:text-black hover:bg-rose-500 hover:duration-500 dark:hover:bg-rose-200"
                onClick={handleDelete}
              >
                삭제
              </button>
              <button
                className="w-16 p-2 text-white rounded bg-rose-400 dark:bg-white dark:text-black hover:bg-rose-500 hover:duration-500 dark:hover:bg-rose-200"
                onClick={handleUpdate}
              >
                수정
              </button>
            </div>
          )}
        </div>
        {isLoading && (
          <div className="text-lg">로딩중입니다. 잠시만 기다려주세요</div>
        )}
        {isError && (
          <div className="text-lg">에러가 발생했습니다. 다시 시도해주세요</div>
        )}

        {post && (
          <div>
            <h1 className="mb-6 text-3xl">{post?.title}</h1>
            <div className="mb-4">
              <Link
                href={`https://map.naver.com/v5/search/${post?.station_nm}역`}
                target="_blank"
                className="p-2 text-white rounded bg-rose-400 dark:bg-white dark:text-black"
              >
                #{post?.station_nm}
              </Link>
            </div>
            <div className="mb-10">
              <span className="font-semibold">{post?.user.nickname!}</span>
              <span className="ml-2 text-xs text-gray-600 dark:text-gray-300">
                방문일 - {getDate(post?.visitedAt!)} / 작성일 -{" "}
                {getDate(post?.createdAt!)}
              </span>
            </div>
            <div>{post?.content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;

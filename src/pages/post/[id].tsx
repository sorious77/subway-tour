import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";

interface User {
  nickname: string;
}

interface PostInfo {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  visitedAt: string;
  station_nm: string;
  user: User;
}

const Post = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: session } = useSession();

  const getDate = (timestamp: string) => {
    const date = new Date(timestamp);

    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      await fetch(`/api/post/delete?id=${post.id}`, {
        method: "DELETE",
      });

      router.push("/list");
    }
  };

  const handleUpdate = () => {
    router.push(`/post/update/${post.id}`);
  };

  return (
    <div className="relative flex flex-col px-10 mt-10">
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
        {session?.user?.user?.nickname === post.user.nickname && (
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
    </div>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query!.id;

  // TODO URL 수정
  const post: PostInfo = await (
    await fetch(`http://localhost:3000/api/post/${id}`)
  ).json();

  return {
    props: { post },
  };
};

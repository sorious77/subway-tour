import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface PostInfo {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  visitedAt: string;
  station_nm: string;
}

const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostInfo>();
  const [loading, setLoading] = useState(true);

  const getDate = (timestamp: string) => {
    const date = new Date(timestamp);

    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const id = router.query.id;

        const result = await (await fetch(`/api/post/${id}`)).json();

        setPost(result);
        setLoading(false);
      }
    })();
  }, [router.isReady]);

  return (
    <div className="relative flex flex-col px-10 mt-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute w-6 h-6 cursor-pointer -top-10"
        onClick={() => {
          router.back();
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
      {loading ? (
        "Loading..."
      ) : (
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
            <span className="font-semibold">{post?.author}</span>
            <span className="ml-2 text-xs text-gray-600 dark:text-gray-300">
              방문일 - {getDate(post?.visitedAt!)} / 작성일 - {getDate(post?.createdAt!)}
            </span>
          </div>
          <div>
            {post?.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface PostInfo {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: number;
  station_nm: string;
}

const Post = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostInfo>();
  const [loading, setLoading] = useState(true);

  const getDate = (timestamp: number) => {
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
    <div className="flex flex-col px-10 mt-10">
      {loading ? (
        "Loading..."
      ) : (
        <div className="relative">
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
            <span className="font-semibold">{post?.author}</span> ·{" "}
            <span className="text-gray-600 dark:text-gray-300">
              {getDate(post?.createdAt!)}
            </span>
          </div>
          <div>
            {post?.content.concat(
              ` 모든 국민은 보건에 관하여 국가의 보호를 받는다. 형사피의자 또는 형사피고인으로서 구금되었던 자가 법률이 정하는 불기소처분을 받거나 무죄판결을 받은 때에는 법률이 정하는 바에 의하여 국가에 정당한 보상을 청구할 수 있다. 
              제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이 지명하는 자를 임명한다. 탄핵결정은 공직으로부터 파면함에 그친다. 그러나, 이에 의하여 민사상이나 형사상의 책임이 면제되지는 아니한다.`
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

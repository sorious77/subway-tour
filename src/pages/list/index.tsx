import Post from "components/Post";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
  nickname: string;
}
interface Post {
  title: string;
  _id: string;
  content: string;
  thumbnail?: string;
  station_nm: string;
  user: User;
  visitedAt: string;
  createdAt: string;
  id: string;
}

const List = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [lastPostId, setLastPostId] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await (await fetch(`/api/list/${lastPostId}`)).json();

      setLoading(false);
      setPosts([...posts, ...result.posts]);
    })();
  }, [lastPostId]);

  const getNextPage = async () => {
    // 현재 페이지 +1
    let size = posts.length;

    setLastPostId(+posts[size - 1].id);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 overflow-y-auto dark:bg-zinc-700">
      <button
        onClick={() => {
          router.push("/write");
        }}
        className="fixed flex items-center self-end p-4 text-white transition-colors duration-300 ease-in-out rounded-full bg-rose-400 right-10 bottom-10 dark:bg-white dark:text-rose-400 hover:bg-rose-500 dark:hover:text-rose-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      {loading ? (
        <span>Loading...</span>
      ) : posts.length === 0 ? (
        <div>게시글 목록이 존재하지 않습니다.</div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-center w-full">
            <div className="flex flex-col justify-center w-1/2">
              {posts.map((post) => (
                <Post
                  key={post.id}
                  title={post.title}
                  id={post.id}
                  content={post.content}
                  author={post.user.nickname}
                  createdAt={post.createdAt}
                />
              ))}
            </div>
          </div>
          <button
            onClick={getNextPage}
            className="px-4 py-2 mb-10 text-white rounded bg-rose-400 dark:bg-white dark:text-black hover:bg-rose-500 hover:transition-colors hover:duration-500 dark:hover:bg-rose-200"
          >
            더 보기...
          </button>
        </div>
      )}
    </div>
  );
};

export default List;

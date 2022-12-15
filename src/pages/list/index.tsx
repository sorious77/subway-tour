import Post from "components/Post";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Post {
  title: string;
  id: string;
  content: string;
  thumbnail?: string;
}

const List = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const result = await (await fetch(`/api/list/${currentPage}`)).json();

      setPosts([...posts, ...result]);
    })();
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <button
        onClick={() => {
          //router.push("/write");
          setCurrentPage((prev) => prev + 1);
        }}
        className="fixed flex items-center self-end p-4 text-white bg-black rounded-full right-10 bottom-10 dark:bg-white dark:text-black"
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
      {posts?.length > 0 ? (
        <div className="w-full">
          {posts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              id={post.id}
              content={post.content}
            />
          ))}
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default List;

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
        className="self-end px-4 my-4 mr-2 text-white bg-black rounded-2xl dark:bg-white dark:text-black"
      >
        글쓰기
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

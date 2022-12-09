import Post from "components/Post";
import loadConfig from "next/dist/server/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Post {
  title: string;
  id: string;
  content: string;
  thumbnail?: string;
}

interface PostInfo {
  posts: Post[];
  pages: number;
}

const List = () => {
  const router = useRouter();
  const [postInfo, setPostInfo] = useState<PostInfo>();

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const page = router.query.page;

        const result = await (await fetch(`/api/list/${page}`)).json();

        setPostInfo(result);
      }
    })();
  }, [router.isReady]);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <button
        onClick={() => {
          router.push("/write");
        }}
        className="self-end px-4 my-4 mr-2 text-white bg-black rounded-2xl dark:bg-white dark:text-black"
      >
        글쓰기
      </button>
      {postInfo ? (
        <>
          {postInfo.posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default List;

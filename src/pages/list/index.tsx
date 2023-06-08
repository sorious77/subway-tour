import Post from "components/Post";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePostList, fetchPostList, usePrefetchPostList } from "queries/posts";
import { useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { pageState } from "components/states";

const List = () => {
  const router = useRouter();
  const [page, setPage] = useRecoilState(pageState);

  const queryClient = useQueryClient();

  const { data, isLoading } = usePostList(page);

  useEffect(() => {
    if (data?.hasMore) {
      usePrefetchPostList(page);
    }
  }, [data, page, queryClient]);

  const handlePrevPage = () => {
    setPage((page) => Math.max(page - 1, 0));
  };

  const handleNextPage = () => {
    setPage((page) => (data?.hasMore ? page + 1 : page));
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
      {isLoading ? (
        <span>Loading...</span>
      ) : data?.posts.length === 0 ? (
        <div>게시글 목록이 존재하지 않습니다.</div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-center w-full">
            <div className="flex flex-col justify-center w-1/2">
              {data?.posts.map((post) => (
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
          <div className="flex">
            <button
              className="border border-rose-400 text-rose-400 rounded font-bold py-4 px-6 mr-2 flex items-center hover:bg-rose-400 hover:text-white dark:border-white dark:text-black dark:bg-white dark:hover:bg-zinc-500 dark:hover:text-white disabled:bg-inherit disabled:text-rose-400 dark:disabled:bg-inherit dark:disabled:text-white"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              Previous page
            </button>
            <button
              className="border border-rose-400 text-rose-400 rounded font-bold py-4 px-6 mr-2 flex items-center hover:bg-rose-400 hover:text-white dark:border-white dark:text-black dark:bg-white dark:hover:bg-zinc-500 dark:hover:text-white disabled:bg-inherit disabled:text-rose-400 dark:disabled:bg-inherit dark:disabled:text-white"
              disabled={!data?.hasMore}
              onClick={handleNextPage}
            >
              Next page
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;

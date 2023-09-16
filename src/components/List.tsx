import { Post as IPost } from "types/posts";
import Post from "./Post";
import Container from "./Container";

interface PostData {
  hasMore: boolean;
  posts: IPost[];
  totalPage: number;
}

interface ListProps {
  isLoading: boolean;
  data: PostData | undefined;
  page: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const List = ({
  isLoading,
  data,
  page,
  handlePrevPage,
  handleNextPage,
}: ListProps) => {
  return (
    <Container>
      {isLoading ? (
        <span>Loading...</span>
      ) : data?.posts.length === 0 ? (
        <div>게시글 목록이 존재하지 않습니다.</div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-center w-full">
            <div className="flex flex-col justify-center w-full">
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
          <div className="flex mb-10">
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
    </Container>
  );
};

export default List;

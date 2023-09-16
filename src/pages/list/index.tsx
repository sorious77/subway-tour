import { usePostList } from "queries/posts";
import { useRecoilState } from "recoil";
import { pageState } from "components/states";
import List from "components/List";
import { useRouter } from "next/router";

const DiaryList = () => {
  const [page, setPage] = useRecoilState(pageState);
  const router = useRouter();

  const { data, isLoading } = usePostList(page);

  const handlePrevPage = () => {
    setPage((page) => Math.max(page - 1, 0));
  };

  const handleNextPage = () => {
    setPage((page) => (data?.hasMore ? page + 1 : page));
  };

  return (
    <div className="relative">
      <div className="fixed right-1/4">
        <button
          className="absoulte right-5 border border-rose-400 bg-rose-400 text-white rounded-full font-bold p-2 hover:bg-white hover:text-rose-400 dark:border-white dark:text-black dark:bg-white dark:hover:bg-zinc-500 dark:hover:text-white dark:hover:border-zinc-500"
          onClick={() => {
            router.push("/write");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>
      <List
        isLoading={isLoading}
        data={data}
        page={page}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

export default DiaryList;

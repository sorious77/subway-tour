import { usePostList } from "queries/posts";
import { useRecoilState } from "recoil";
import { pageState } from "components/states";
import List from "components/List";

const DiaryList = () => {
  const [page, setPage] = useRecoilState(pageState);

  const { data, isLoading } = usePostList(page);

  const handlePrevPage = () => {
    setPage((page) => Math.max(page - 1, 0));
  };

  const handleNextPage = () => {
    setPage((page) => (data?.hasMore ? page + 1 : page));
  };

  return (
    <List
      isLoading={isLoading}
      data={data}
      page={page}
      handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
    />
  );
};

export default DiaryList;

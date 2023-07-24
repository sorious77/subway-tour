import { useRouter } from "next/router";
import { usePostListByEmail } from "queries/posts";
import { useRecoilState, useRecoilValue } from "recoil";
import { pageState, userState } from "components/states";
import List from "components/List";

const MyDiary = () => {
  const router = useRouter();
  const [page, setPage] = useRecoilState(pageState);
  const user = useRecoilValue(userState);

  const { data, isLoading } = usePostListByEmail(page, user);

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

export default MyDiary;

// import { usePostListByEmail } from "queries/posts";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { pageState, userState } from "components/states";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { Post } from "types/posts";

// interface DiaryData {
//   data: {
//     hasMore: boolean;
//     posts: Post[];
//     totalPage: number;
//   };
//   isLoading: boolean;
// }

// const MyDiary = () => {
//   const [page, setPage] = useRecoilState(pageState);
//   const user = useRecoilValue(userState);
//   const { data: session } = useSession();

//   const [data, setData] = useState<DiaryData>();

//   const postList = session
//     ? usePostListByEmail(page, user)
//     : { data: null, isLoading: null };

//   const handlePrevPage = () => {
//     setPage((page) => Math.max(page - 1, 0));
//   };

//   const handleNextPage = () => {
//     // setPage((page) => (data?.hasMore ? page + 1 : page));
//   };

//   useEffect(() => {
//     async () => {
//       if (!session) return;

//       const email = session.user.user.email;

//       const { data, isLoading } = usePostListByEmail(1, email);

//       if (!data) return;

//       setData({ data, isLoading });
//     };
//   }, [session]);

//   return (
//     // <List
//     //   isLoading={isLoading}
//     //   data={data}
//     //   page={page}
//     //   handlePrevPage={handlePrevPage}
//     //   handleNextPage={handleNextPage}
//     // />
//     <div>Hi~</div>
//   );
// };

// // export const getServerSideProps: GetServerSideProps = async (context) => {
// //   const session = await getSession(context);

// //   const email = session?.user.user.email || "";

// //   console.log()

// //   return {
// //     props: {
// //       email,
// //     },
// //   };
// // };

// export default MyDiary;

export default () => {
  return <div>Hi</div>;
};

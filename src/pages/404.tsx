import { useRouter } from "next/router";
import Head from "next/head";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Head>
        <title>Subway Tour | 404</title>
      </Head>
      <div className="mb-4 text-2xl">요청하신 페이지를 찾을 수 없습니다.</div>
      <button
        className="px-4 py-2 text-white bg-black rounded dark:text-black dark:bg-white"
        onClick={() => router.push("/")}
      >
        홈으로
      </button>
    </div>
  );
};

export default NotFound;

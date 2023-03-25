import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="mb-4 text-9xl">🚇</h1>
      {session?.user && (
        <div className="text-2xl">안녕, {session?.user?.nickname}!</div>
      )}
    </div>
  );
};

export default Home;

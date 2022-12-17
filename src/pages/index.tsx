import { useRecoilValue } from "recoil";
import { userState } from "components/states";

interface User {
  nickname: string;
}

const Home = () => {
  const user = useRecoilValue<User | null>(userState);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="mb-4 text-9xl">🚇</h1>
      {user && <div className="text-2xl">안녕, {user.nickname}!</div>}
    </div>
  );
};

export default Home;

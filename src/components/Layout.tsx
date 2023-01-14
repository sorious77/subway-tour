import React from "react";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { userState } from "components/states";
import { useRecoilState } from "recoil";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [user, setUser] = useRecoilState(userState);

  // TODO session으로 변경
  useEffect(() => {
    if (user) {
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div className="flex flex-col w-full h-full text-black transition-all duration-300 ease-in bg-white dark:text-white dark:bg-zinc-700">
      <NavBar />
      <div className="self-center w-full h-full">{children}</div>
    </div>
  );
};

export default Layout;

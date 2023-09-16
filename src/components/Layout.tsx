import React from "react";
import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-full h-full text-black transition-all duration-300 ease-in bg-white dark:text-white dark:bg-zinc-700">
      <NavBar />
      <div className="self-center w-full h-full max-w-lg mt-16">{children}</div>
    </div>
  );
};

export default Layout;

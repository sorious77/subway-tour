import React from "react";
import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-full h-full text-black transition-colors duration-500 ease-in bg-white dark:text-white dark:bg-gray-900">
      <NavBar />
      <div className="self-center w-full h-full">{children}</div>
    </div>
  );
};

export default Layout;

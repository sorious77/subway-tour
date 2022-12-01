import React from "react";
import NavBar from "components/NavBar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="self-center">{children}</div>
    </div>
  );
};

export default Layout;

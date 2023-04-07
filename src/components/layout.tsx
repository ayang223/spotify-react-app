import React from "react";
import Header from "./header";
type LayoutProp = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProp) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* footer */}
    </>
  );
};

export default Layout;

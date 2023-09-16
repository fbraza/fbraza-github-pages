import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navigation />
      <main className="mt-24 mb-auto">{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;

import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;

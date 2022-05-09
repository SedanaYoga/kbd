import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;

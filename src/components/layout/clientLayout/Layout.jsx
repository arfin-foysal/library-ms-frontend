import React from "react";
import { Link, Outlet } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "./../../../store/index";
import logo from "./../../../assets/logo/logo.png";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const authUser = useSelector((state) => state.auth.token);

  return (
    <div>
      <Header />
      <div className="content-wrapper">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Layout;

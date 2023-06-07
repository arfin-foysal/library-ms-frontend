import React from "react";
import ebook from "./../../../../assets/images/dashboard-ebook.png";
import { Link, Outlet } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { BsFillCaretDownSquareFill } from "react-icons/bs";
import { MdPending } from "react-icons/md";
const ClientLayout = () => {
  return (
    <div>
      <div className="container">
        <div className=" text-center">
          <img src={ebook} alt="" />
        </div>
        <div className="row">
          <div className="col-4">
            {/* //Navbar */}

            <nav>
              <ul className="nav flex-column">
                <li class="nav-item">
                  <Link className="nav-link text-dark" to="d">
                    <HiInformationCircle /> Personal Information
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="#">
                    <BsFillCaretDownSquareFill /> Items Borrowed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="#">
                    <MdPending /> Pending Items
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;

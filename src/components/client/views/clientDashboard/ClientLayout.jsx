import React from "react";
import ebook from "./../../../../assets/images/dashboard-ebook.png";
import { Link, Outlet } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { RiBookFill } from "react-icons/ri";
import { MdPending } from "react-icons/md";
import { BsFillCalendarEventFill } from "react-icons/bs";
const ClientLayout = () => {
  return (
    <div>    <div className=" text-center " style={{backgroundColor:"#6682C81A"}}>
          <img src={ebook} alt="" />
        </div>
      <div className="container">
    
        <div className="row py-4">
          <div className="col-4">
            {/* //Navbar */}

            <nav>
              <ul className="nav flex-column">
                <li class="nav-item">
                  <Link className="nav-link " to="/client-dashboard/">
                    <HiInformationCircle /> Personal Information
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/client-dashboard/items-borrowed">
                    <RiBookFill /> Items Borrowed
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/client-dashboard/pending-items">
                    <MdPending /> Pending Items
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/client-dashboard/over-due-items">
                    <BsFillCalendarEventFill size={12} /> Over Due Items
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

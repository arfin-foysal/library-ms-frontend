import React from "react";
import "./Client.css"
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="" style={{ backgroundColor: "#033D75" }}>
        <div className=" container">
          <div className="row  text-white mt-2 py-5 ">
            <div className="col-4">
              <h4>Library Management System</h4>
              <p 
                style={{
                  fontSize: "13px",
                }}
              >
              BacBon limited was incorporated in Bangladesh on December 23, 2013, under the companies act (Act XVIII) of 1994, with the registrar of Joint Stock Companies & Firms Bangladesh (The registration number is C-113111/13).
              </p>
            </div>
            <div className="col-4">
              <ul className=" list-unstyled">

                <Link to="/">
                  <li>
                    Home
                  </li>

                </Link>
                <Link to="/allbook">
                  <li>

                    All Books
                  </li>
                </Link>
                <Link to="/author">
                  <li>

                    Author
                  </li>
                </Link>
                <Link to="/contact">
                  <li>
                    Contact
                  </li>
                </Link>


              </ul>
            </div>
            <div className="col-4">
              <h6>Need Help?</h6>
              <textarea
                className=" form-control"
                name=""
                id=""
                cols="25"
                rows="2"
              ></textarea>
              <input className="form-control my-2" type="email" name="" id="" />
              <button className="form-control">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

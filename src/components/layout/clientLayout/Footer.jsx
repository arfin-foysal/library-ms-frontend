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
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
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
                    Contact Us
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

import React from "react";
import damo from "./../../../../assets/images/img_1.jpg";
import { Link } from "react-router-dom";
const BookCard = () => {
  return (
    <div className="card p-3 border-primary shadow" style={{ width: "15rem" }}>
      <Link to={`bookdetails/${1}`}>
             <img src={damo} className="card-img-top rounded" alt="..." />
      </Link>
 
      <div className="card-body m-0 p-0">
        <p className="card-text p-0 m-0 mt-2">Lord of the Rings</p>
        <div className="mt-2">
          <Link type="button" className="btn btn-light shadow">
            Novel
          </Link>
          <Link type="button" className="btn btn-light ms-5">
            1125
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

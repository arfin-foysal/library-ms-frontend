import React from "react";
import damo from "./../../../../assets/images/img_1.jpg";
import { Link } from "react-router-dom";
const BookCard = ({ book }) => {
  return (
    <div className="card p-3 border-primary shadow" style={{ width: "15rem" }}>
      <Link to={`bookdetails/${book?.id}`}>
        <img
          src={`${import.meta.env.VITE_FILE_URL}/${book?.photo}`}
          className="card-img-top rounded"
          alt="..."
          height={200}
        />
      </Link>

      <div className="card-body m-0 p-0">
        <p className="card-text p-0 m-0 mt-2">{book?.title}</p>
        <div className="mt-2">
          <Link type="button" className="btn btn-light shadow">
            {book?.item_type}
          </Link>
          <Link type="button" className="btn btn-light ms-5">
            {book?.edition}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

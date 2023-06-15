import React from "react";
import damo from "./../../../../assets/images/img_1.jpg";
import { Link } from "react-router-dom";
const BookCard = ({ book }) => {
  return (
    <div className="card p-3 border-primary shadow" style={{ width: "15rem" }}>
      <Link to={`/bookdetails/${book?.id}`}>
        <img
          src={`${import.meta.env.VITE_FILE_URL}/${book?.photo}`}
          className="card-img-top rounded"
          alt="..."
          height={200}
        />
      </Link>

      <div className="card-body m-0 p-0 text-center">
        <p className="card-text p-0 m-0 mt-2 text-capitalize">{book?.title}</p>
        <div className="mt-2">

          <p className=" text-muted"> <b>by </b>{book?.authors[0]?.name}</p>
          <hr />

          <Link to={`/bookdetails/${book?.id}`} className="btn btn-primary btn-sm btn-library">
            View Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

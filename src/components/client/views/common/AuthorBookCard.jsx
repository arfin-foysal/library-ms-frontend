import React from "react";
import damo from "./../../../../assets/images/img_1.jpg";
import { Link } from "react-router-dom";
import Star from "./Star";
const AuthorBookCard = ({ book }) => {
  return (
    <div className="card p-3 border-primary shadow" style={{ width: "13rem" }}>
      <Link to={`/bookdetails/${book?.item_id}`}>
        <img
          src={`${import.meta.env.VITE_FILE_URL}${book?.photo}`}
          className="card-img-top rounded"
          alt="..."
          height={120}
        />
      </Link>

      <div className="card-body m-0 p-0 text-center">
        <p className="card-text p-0 m-0 mt-2">{book?.title}</p>
        <div className="mt-2">
          <p className=" text-muted m-0 p-0">
            <b>Category By</b> {book?.category_name}
          </p>   {
            // rating
            book?.rating ? (
              <Star rating={book?.rating} />
            ) :
              (
                <Star rating={0} />
              )
          }
          <hr />
       

          <Link
            to={`/bookdetails/${book?.item_id}`}
            className="btn btn-primary btn-sm btn-library"
          >
            View Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorBookCard;

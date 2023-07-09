import React from "react";
import demo from "./../../../../assets/images/profile-picture.png";
import { Link } from "react-router-dom";


import Star from "./Star";
const BookCard = ({ book }) => {
  return (
    <div className="card p-3 border-primary shadow" style={{ width: "12rem" }}>
      <Link to={`/bookdetails/${book?.id}`}>

        {book?.photo === null ? (
          <img
            src={demo}
            className="card-img-top rounded"
            alt="..."
            height={120}
          />
        ) : (
             <img
          src={`${import.meta.env.VITE_FILE_URL}/${book?.photo}`}
          className="card-img-top rounded"
          alt="..."
          height={120}
        /> 
        )
          
        }


      
      </Link>

      <div className="card-body m-0 p-0 text-center">
        <p className="card-text p-0 m-0 mt-2 text-capitalize">{book?.title}</p>
        <div className="mt-2">

          <p className=" text-muted p-0 m-0"> <b>by </b>{book?.authors[0]?.name}</p>

          {/* rating */}
          <div className="p-0 m-0">
            <Star rating={book?.rating} />
          </div>
          {/* rating */}

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

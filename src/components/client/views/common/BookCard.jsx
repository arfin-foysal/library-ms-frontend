import React from "react";
import damo from "./../../../../assets/images/img_1.jpg";
import { Link } from "react-router-dom";

import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs"
const BookCard = ({ book }) => {
  console.log(book);
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
          {/* rating */}
          {/* // rating value is book.rating */}


          <span className="text-warning">
            {book?.rating.toString().includes(".") &&
              Array(5)
                .fill(0)
                .map((_, i) => {
                  const decimal = book?.rating.toString().split(".")[1];
                  if (i < book?.rating.toString().split(".")[0]) {
                    return <BsStarFill key={i} />;
                  } else if (i === parseInt(book?.rating.toString().split(".")[0])) {
                    return decimal >= 5 ? (
                      <BsStarHalf key={i} />
                    ) : (
                      <BsStar key={i} />
                    );
                  } else {
                    return <BsStar key={i} />;
                  }
                }
                )


            }
          </span> ({ Number(book?.rating).toFixed(1)})








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

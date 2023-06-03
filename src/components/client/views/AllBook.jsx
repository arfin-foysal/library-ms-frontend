import React from "react";
import BookCard from "./common/BookCard";

const AllBook = () => {
  return (
    <div className=" container">
      <div class="row">
        <div className="col"></div>
        <div className="col"></div>{" "}
        <div className="col-md-4 co-12 my-4">
          <input
            type="search"
            className=" form-control rounded-5"
            name=""
            id=""
            placeholder="Search by your preference"
          />
        </div>
      </div>

      <h3>All Books</h3>
      <div className="my-5">
        <BookCard />
      </div>
    </div>
  );
};

export default AllBook;

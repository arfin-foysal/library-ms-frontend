import React from "react";
import BookCard from "./common/BookCard";
import { useGetAllBookItemQuery } from "../../../services/ClientApi";
import Loader from "../../dashboard/common/Loader";

const AllBook = () => {
  const bookRes = useGetAllBookItemQuery();
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
        {bookRes?.isLoading && <Loader />}

        <div className="d-flex flex-wrap justify-content-between">
          {bookRes?.data?.data?.map((book, i) => (
            <div className="m-2" >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 text-center">
        <button
          className="btn"
          style={{ backgroundColor: "#033D75", color: "white" }}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default AllBook;

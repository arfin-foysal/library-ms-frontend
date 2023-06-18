import React, { useEffect, useState } from "react";
import BookCard from "./common/BookCard";

import Loader from "../../dashboard/common/Loader";
import { useGetAllBookItemQuery } from "../../../services/clientSiteApi";

const AllBook = () => {
  const [limit, setLimit] = useState(5);

  const bookRes = useGetAllBookItemQuery({ limit: limit });
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);



  const handelSearch = (e) => {
    e.preventDefault();

    const searchWord = e.target.value;
    setSearch(searchWord);
    if (searchWord !== "") {
      const newBookList = bookRes?.data?.data?.data?.filter((book) => {
        return Object.values(book)
          .join(" ")
          .toLowerCase()
          .includes(searchWord.toLowerCase());
      });
      setFilteredData(newBookList);
    }
    if (searchWord === "") {
      setFilteredData(bookRes?.data?.data);
    }
  };

  useEffect(() => {
    setFilteredData(bookRes?.data?.data);
  }, [bookRes?.data?.data]);

  return (
    <div className=" container">
      <div class="row">
        <div className="col"></div>
        <div className="col"></div>{" "}
        <div className="col-md-4 co-12 my-4">
          <input
            type="search"
            className=" form-control rounded-5"
            placeholder="Search by your preference"
            name="search"
            onChange={(e) => handelSearch(e)}
            value={search}
          />
        </div>
      </div>

      <h3>All Books</h3>
      <div className="my-5">
        {bookRes?.isLoading && <Loader />}
        <div className="d-flex flex-wrap justify-content-between">
          {filteredData?.data?.map((book, i) => (
            <div className="m-2" key={i}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 text-center">
        {bookRes?.data?.data?.total > limit && (
          <button
            onClick={() => {
              setLimit(limit + 5);
            }}
            className="btn btn-sm"
            style={{ backgroundColor: "#033D75", color: "white" }}
          >
            View More {bookRes.isFetching && (
              <span
                class="spinner-border spinner-border-sm "
                role="status"
              ></span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AllBook;

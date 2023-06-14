import React, { useEffect, useState } from "react";
import avatar from "./../../../../src/assets/images/profile-picture.png/";

import Loader from "./../../dashboard/common/Loader";
import { Link } from "react-router-dom";
import { useGetAuthorAndItemQuery } from "../../../services/clientSiteApi";
const AllAuthor = () => {
  const res = useGetAuthorAndItemQuery();

  const { data, isLoading, isError, error } = res;

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handelSearch = (e) => {
    e.preventDefault();

    const searchWord = e.target.value;
    setSearch(searchWord);
    if (searchWord !== "") {
      const newBookList =data?.data?.filter((book) => {
        return Object.values(book)
          .join(" ")
          .toLowerCase()
          .includes(searchWord.toLowerCase());
      });
      setFilteredData(newBookList);
    }
    if (searchWord === "") {
      setFilteredData(data?.data);
    }
  };

  useEffect(() => {
    setFilteredData(data?.data);
  }, [data?.data]);
  

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

      <h3>All Author</h3>
      <div className="my-5">
        {isLoading && <Loader />}
        {filteredData?.map((author, i) => (
          <div className="row shadow-lg border p-3 my-3">
            <div className="col pt-3 text-center">
              {author?.photo ? (
                <img
                  className="img-fluid rounded-circle shadow"
                  style={{ width: "80px" }}
                  src={`${import.meta.env.VITE_FILE_URL}${author?.photo}`}
                  alt=""
                ></img>
              ) : (
                <img
                  className="img-fluid rounded-circle shadow"
                  style={{ width: "80px" }}
                  src={avatar}
                  alt="..."
                ></img>
              )}
            </div>
            <div className="col-md-8 mt-3">
              <h5>{author.name}</h5>
              <p>{author?.bio}</p>
              <p>{author?.items?.length} published</p>
            </div>
            <div className="col mt-5 text-center">
              <Link to={`/authordetails/${author.id}`} className="btn btn-primary btn-sm" >View Books</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAuthor;

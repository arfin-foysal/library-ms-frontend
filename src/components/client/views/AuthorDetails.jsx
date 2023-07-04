import React from "react";
import BookCard from "./common/BookCard";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { MdLanguage } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import avatar from "./../../../../src/assets/images/profile-picture.png/";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBorrow } from "../../../features/borrowSlice";
import ReactPlayer from "react-player";
import Loader from "../../dashboard/common/Loader";
import RelatedBookCard from "./common/RelatedBookCard";
import AuthorBookCard from "./common/AuthorBookCard";
import { useGetAuthorAndItemQuery } from "../../../services/clientSiteApi";

const AuthorDetails = () => {
  const { id } = useParams();

  const res = useGetAuthorAndItemQuery();
  const { data, isLoading, isError, error } = res;

  const authorDetails = data?.data?.find((author) => author.id == id);

 

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="my-4">
            <h3>Author Details Information</h3>
            <hr />
          </div>

          <div className="row">
            <div className="col-4">
              <div style={{ width: "15rem" }}>
                <div className="text-center">
                  {authorDetails?.photo ? (
                    <img
                      className="img-fluid rounded-circle shadow"
                      style={{ width: "100px" }}
                      src={`${import.meta.env.VITE_FILE_URL}${
                        authorDetails?.photo
                      }`}
                      alt=""
                    ></img>
                  ) : (
                    <img
                      className="img-fluid rounded-circle shadow"
                      style={{ width: "100px" }}
                      src={avatar}
                      alt="..."
                    ></img>
                  )}
                  <div className="mt-2">
                    <h5>{authorDetails?.name}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <h5>
                <b>Name:</b> {authorDetails?.name}
              </h5>
          
              <p>
                {" "}
                <b>Published:</b> {authorDetails?.items?.length} Books
              </p>
              <p>
                <b>Email:</b> {authorDetails?.email}
              </p>    <p>
                <b>Biography:</b> {authorDetails?.bio}
              </p>
            </div>
          </div>

          <div>
            <div className="my-5">
              <h3> Books by {authorDetails?.name}</h3>
              <hr />
            </div>

            <div className="d-flex flex-wrap justify-content-between mb-5">
              {authorDetails?.items?.map((book, i) => (
                <div className="m-2" key={i}>
                  <AuthorBookCard key={i} book={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorDetails;

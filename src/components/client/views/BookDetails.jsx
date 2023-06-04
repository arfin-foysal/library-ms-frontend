import React from "react";
import BookCard from "./common/BookCard";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { MdLanguage } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
// import avatar from "./../../../../src/assets/images/profile-picture.png/";
import { useGetAllBookItemQuery } from "../../../services/ClientApi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBorrow } from "../../../features/borrowSlice";

const BookDetails = () => {
  const { id } = useParams();
  const bookRes = useGetAllBookItemQuery();
  const book = bookRes?.data?.data?.find((book) => book.id === parseInt(id));
  const dispatch = useDispatch();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="container my-5">
              <div className="row">
                <div className="col-md-4 col-12">
                  <BookCard book={book} />
                  <div className="text-center mt-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => dispatch(addBorrow({
                        id: book?.id,
                        title: book?.title,
                        photo: book?.photo,
                        item_qty: 1,
                        return_date: "",

                      }))}
                    >
                      Add Borrow
                    </button>
                  </div>
                </div>
                <div className="col-md-8 col-12">
                  <h5>
                    {book?.title} by {book?.authors[0]?.name}
                  </h5>
                  <p>Originally published: {book?.publish_date}</p>
                  <p>Genres: {book?.category_name}</p>
                  <p>{book?.summary}</p>
                  <div className="row">
                    <div className="col">
                      <p>
                        <b>Page Length</b>
                      </p>
                      <HiOutlineDocumentDuplicate size={37} />
                      <p>{book?.number_of_page}</p>
                    </div>
                    <div className="col">
                      <p>
                        <b>Language</b>
                      </p>
                      <MdLanguage size={35} />
                      <p>{book?.language_name}</p>
                    </div>
                    <div className="col">
                      <p>
                        <b>Publish date</b>
                      </p>
                      <BsCalendar2Date size={30} />
                      <p>{book?.publish_date}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-5">
                    <h5>About the author</h5>
                    <img
                      src={`${import.meta.env.VITE_FILE_URL}/${
                        book?.authors[0]?.author_photo
                      }`}
                      className="card-img-top rounded"
                      alt="..."
                      style={{ width: "100px", height: "100px" }}
                    />
                    <b className="ms-2">{book?.authors[0]?.name}</b>
                    <br />
                    <p>{book?.authors[0]?.author_bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12"></div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;

import React from "react";
import BookCard from "./common/BookCard";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { MdLanguage } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import avatar from "./../../../../src/assets/images/profile-picture.png/";
import {
  useGetAllBookItemQuery,
  useGetItemByIdQuery,
} from "../../../services/ClientApi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBorrow } from "../../../features/borrowSlice";
import ReactPlayer from "react-player";
import Loader from "../../dashboard/common/Loader";
import RelatedBookCard from "./common/RelatedBookCard";
import BrochureView from "./common/BrochureView";

const BookDetails = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const { id } = useParams();
  const bookDetailsRes = useGetItemByIdQuery(id);
  const book = bookDetailsRes?.data?.data;

  const dispatch = useDispatch();
  return (
    <>
      <BrochureView show={modalShow} onHide={() => setModalShow(false)} brochure={book?.brochure} />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="container ">
              <div className="row">
                {bookDetailsRes.isFetching && <Loader />}

                <div className="col-md-4 col-12 ">
                  <div
                    className="card p-3 border-primary shadow"
                    style={{ width: "15rem" }}
                  >
                    <div>
                      <img
                        src={`${import.meta.env.VITE_FILE_URL}/${book?.photo}`}
                        className="card-img-top rounded"
                        alt="..."
                        height={200}
                      />
                    </div>

                    <div className="card-body m-0 p-0 text-center"></div>
                  </div>

                  <div className="text-md-center mt-2 ">
                    {book?.item_type === "physical" ? (
                      <button
                        className="btn btn-primary my-3 btn-sm"
                        onClick={() =>
                          dispatch(
                            addBorrow({
                              id: book?.id,
                              item_id: book?.id,
                              title: book?.title,
                              photo: book?.photo,
                              item_qty: 1,
                              return_date: "",
                            })
                          )
                        }
                      >
                        Add Borrow
                      </button>
                    ) : (
                      // <a
                      //   className="mt-2"
                      //   href={`${import.meta.env.VITE_FILE_DOC_URL}${
                      //     book?.brochure
                      //   }`}
                      //   target="_blank"
                      //   rel="noreferrer"
                      // >
                        <button
                          className="btn btn-primary btn-sm"
                          variant="primary"
                          onClick={() => setModalShow(true)}
                        >
                          View
                        </button>
                      // </a>
                    )}
                  </div>

                  <div></div>
                </div>
                <div className="col-md-8 col-12">
                  <h5>{book?.title} </h5>
                  <p>
                    by{" "}
                    <span className="text-primary">
                      {book?.authors[0]?.name}
                    </span>
                  </p>
                  <p>
                    <b>Category: </b>

                    <span className="text-primary">{book?.category_name}</span>
                  </p>
                  <p>
                    <b>Book Type: </b>

                    <span className="text-primary">{book?.item_type}</span>
                  </p>

                  <p>
                    <b>Originally Published: </b>
                    {book?.publish_date}
                  </p>

                  <div className="row mt-2 border border-1 py-2">
                    <h5>Product Specification</h5>
                    <hr />
                    <div className="my-2">
                      <p>
                        <b>ISBN:</b> {book?.isbn}
                      </p>
                      <p>
                        <b>Edition:</b> {book?.edition}
                      </p>
                      <p>
                        <b>Country:</b> {book?.country_name}
                      </p>
                      <p>
                        <b>Publisher:</b> {book?.publisher_name}
                      </p>
                      <p>
                        <b>Summery:</b> {book?.summary}
                      </p>
                    </div>

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

                  <div className="mt-3">
                    <h5>About the author</h5>

                    {book?.authors?.map((author, i) => (
                      <div key={i}>
                        {author?.author_photo ? (
                          <img
                            className="img-fluid rounded-circle shadow"
                            style={{ width: "40px", height: "40px" }}
                            src={`${import.meta.env.VITE_FILE_URL}${
                              author?.author_photo
                            }`}
                            alt=""
                          ></img>
                        ) : (
                          <img
                            className="img-fluid rounded-circle shadow"
                            style={{ width: "40px", height: "40px" }}
                            src={avatar}
                            alt=""
                          ></img>
                        )}

                        <b className="ms-2 ">{author?.name}</b>
                        <br />
                        {/* <p className="my-2">
                          <b>Biography:</b> {author?.author_bio}
                        </p> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12">
            <div>
              <h5> Related Products</h5>
              <div className="d-flex flex-wrap justify-content-between mb-5">
                {book?.related_items?.map((book, i) => (
                  <RelatedBookCard key={i} book={book} />
                ))}
              </div>
            </div>
            <div>
              <ReactPlayer
                className="react-player
                react-player__shadow
                 border border-2 border-primary
                  rounded
                "
                url={book?.video_url}
                controls
                width="420px"
                height="220px"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;

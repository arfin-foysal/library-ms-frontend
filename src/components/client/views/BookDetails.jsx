import React from "react";
import BookCard from "./common/BookCard";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { MdLanguage } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import avatar from "./../../../../src/assets/images/profile-picture.png/";

const BookDetails = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="container my-5">
              <div className="row">
                <div className="col-md-4 col-12">
                  <BookCard />
                  <div className="text-center mt-2">
                    <button className="btn btn-primary">Add Borrow</button>
                  </div>
                </div>
                <div className="col-md-8 col-12">
                  <h5>The Great Gatesby by F. Scott Fitzgerald</h5>
                  <p>Originally published: April 10, 1925</p>
                  <p>Genres: Novel</p>
                  <p>
                    The Great Gatsby is a 1925 novel by American writer F. Scott
                    Fitzgerald. Set in the Jazz Age on Long Island, near New
                    York City, the novel depicts first-person narrator Nick
                    Carraway's interactions with mysterious millionaire Jay
                    Gatsby and Gatsby's obsession to reunite with his former
                    lover, Daisy Buchanan. read more
                  </p>
                  <div className="row">
                    <div className="col">
                      <p>
                        <b>Page Length</b>
                      </p>
                      <HiOutlineDocumentDuplicate size={37} />
                      <p>280</p>
                    </div>
                    <div className="col">
                      <p>
                        <b>Language</b>
                      </p>
                      <MdLanguage size={35} />
                      <p>English</p>
                    </div>
                    <div className="col">
                      <p>
                        <b>Publish date</b>
                      </p>
                      <BsCalendar2Date size={30} />
                      <p>12 Dec, 2013</p>
                    </div>
                                  </div>
                                       <hr />
                                  <div className="mt-5">
                                 
                    <h5>About the author</h5>
                    <img src={avatar} width={80} alt="" />
                    <b className="ms-2">F. Scott Fitzgerald</b>
                    <br />
                    Discover more of the author’s books, see similar authors,
                    read author blogs and more.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12" ></div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;

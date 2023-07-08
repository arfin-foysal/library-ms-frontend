import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateBookRents from "./CreateBookRents";
import ReturnBook from "./ReturnBook";
import BookRentDetails from "./BookRentDetails";
import BookBuyDetails from "../buyBook/BookBuyDetails";


const BookRentsModal
 = ({ handleClose, show, clickValue, paramId }) => {

  



  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          className=" text-white"
          style={{ backgroundColor: "#3f4d67" }}
        >
          <Modal.Title>{clickValue}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Borrow Item" && (
            <CreateBookRents handleClose={handleClose} />
          )}
          {clickValue === "Return Item" && (
            <ReturnBook handleClose={handleClose} param={paramId} />
          )}
          {clickValue === "Borrow Information" && (
            <BookRentDetails handleClose={handleClose} values={paramId} />
          )}
          {clickValue === "Item Information" && (
            <BookBuyDetails handleClose={handleClose} values={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </> 
  );
};

export default React.memo(BookRentsModal
  );

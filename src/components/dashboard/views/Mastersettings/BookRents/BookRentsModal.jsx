import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateBookRents from "./CreateBookRents";
import ReturnBook from "./ReturnBook";
import BookRentDetails from "./BookRentDetails";


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
          {clickValue === "Book Issue" && (
            <CreateBookRents handleClose={handleClose} />
          )}
          {clickValue === "Return Book" && (
            <ReturnBook handleClose={handleClose} param={paramId} />
          )}
          {clickValue === "Book Issue Information" && (
            <BookRentDetails handleClose={handleClose} values={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(BookRentsModal
  );

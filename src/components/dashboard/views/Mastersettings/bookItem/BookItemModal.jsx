import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateBookItem from "./CreateBookItem";
import EditBookItem from "./EditBookItem";

const BookItemModal = ({ handleClose, show, clickValue, paramId }) => {

  



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
          {clickValue === "Add New Book Item" && (
            <CreateBookItem handleClose={handleClose} />
          )}
          {clickValue === "Edit Book Item" && (
            <EditBookItem handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(BookItemModal);

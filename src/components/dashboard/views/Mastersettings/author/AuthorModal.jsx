import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateAuthor from "./CreateAuthor";
import EditAuthor from "./EditAuthor";

const AuthorModal = ({ handleClose, show, clickValue, paramId }) => {
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
          {clickValue === "Add New Author" && (
            <CreateAuthor handleClose={handleClose} />
          )}
          {clickValue === "Edit Author" && (
            <EditAuthor handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(AuthorModal);

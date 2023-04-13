import React from "react";

import Modal from "react-bootstrap/Modal";
import CreatePublisher from "./CreatePublisher";
import EditPublisher from "./EditPublisher";
import PublisherDetails from "./PublisherDetails";


const PublisherModal = ({ handleClose, show, clickValue, paramId }) => {

  



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
          {clickValue === "Add New Publisher" && (
            <CreatePublisher handleClose={handleClose} />
          )}
          {clickValue === "Edit Publisher" && (
            <EditPublisher handleClose={handleClose} param={paramId} />
          )}
          {clickValue === "Publisher Information" && (
            <PublisherDetails handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(PublisherModal);

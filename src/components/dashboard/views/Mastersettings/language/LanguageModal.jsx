import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateLanguage from "./CreateLanguage";
import EditLanguage from "./EditLanguage";
;


const LanguageModal = ({ handleClose, show, clickValue, paramId }) => {

  



  return (
    <>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header
          closeButton
          className=" text-white"
          style={{ backgroundColor: "#3f4d67" }}
        >
          <Modal.Title>{clickValue}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Add New Language" && (
            < CreateLanguage handleClose={handleClose} />
          )}
          {clickValue === "Edit Language" && (
            <EditLanguage  handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(LanguageModal);

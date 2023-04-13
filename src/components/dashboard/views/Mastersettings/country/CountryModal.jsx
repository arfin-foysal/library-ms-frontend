import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateCountry from "./CreateCountry ";
import EditCountry from "./EditCountry ";




const CountryModal = ({ handleClose, show, clickValue, paramId }) => {

  



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
          {clickValue === "Add New Country" && (
            < CreateCountry handleClose={handleClose} />
          )}
          {clickValue === "Edit Country" && (
            <EditCountry  handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(CountryModal);

import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateCategory from './CreateUser';
import EditCategory from "./EditUser";


const UserModal = ({ handleClose, show, clickValue, paramId }) => {

  



  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header
          closeButton
          className=" text-white"
          style={{ backgroundColor: "#3f4d67" }}
        >
          <Modal.Title>{clickValue}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clickValue === "Add New User" && (
            <CreateCategory handleClose={handleClose} />
          )}
          {clickValue === "Edit User" && (
            <EditCategory  handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(UserModal);

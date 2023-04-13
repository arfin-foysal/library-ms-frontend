import React from "react";

import Modal from "react-bootstrap/Modal";

import CreateSubCategory from "./CreateSubCategory";
import EditSubCategory from "./EditSubCategory";


const SubCategoryModal = ({ handleClose, show, clickValue, paramId }) => {

  



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
          {clickValue === "Add New Sub Category" && (
            <CreateSubCategory handleClose={handleClose} />
          )}
          {clickValue === "Edit Sub Category" && (
            < EditSubCategory handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(SubCategoryModal);

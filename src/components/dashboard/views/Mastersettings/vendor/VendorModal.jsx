import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateVendor from "./CreateVendor";
import EditVendor from "./EditVendor";
import VendorDetails from "./VendorDetails";



const VendorModal = ({ handleClose, show, clickValue, paramId }) => {
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
          {clickValue === "Add New Vendor" && (
            <CreateVendor handleClose={handleClose} />
          )}
          {clickValue === "Edit Vendor" && (
            <EditVendor handleClose={handleClose} param={paramId} />
          )}
          {clickValue === "Vendor Information" && (
            <VendorDetails handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(VendorModal);

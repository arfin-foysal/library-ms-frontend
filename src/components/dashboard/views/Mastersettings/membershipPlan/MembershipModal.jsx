import React from "react";

import Modal from "react-bootstrap/Modal";
import CreateMembership from "./CreateMembership";
import EditMembership from "./EditMembership";

const MembershipModal = ({ handleClose, show, clickValue, paramId }) => {

  



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
          {clickValue === "Add New Membership" && (
            <CreateMembership handleClose={handleClose} />
          )}
          {clickValue === "Edit Membership" && (
            <EditMembership handleClose={handleClose} param={paramId} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(MembershipModal);

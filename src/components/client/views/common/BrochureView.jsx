import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const BrochureView = (props) => {
  console.log(props.brochure);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="p-0 m-0">
        <embed
          src={`${import.meta.env.VITE_FILE_DOC_URL}${props?.brochure}`}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      </Modal.Body>

    </Modal>
  );
};

export default BrochureView;

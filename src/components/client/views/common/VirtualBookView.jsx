import React from "react";
import Modal from "react-bootstrap/Modal";
const VirtualBookView = (props) => {
 
  return (
    <Modal
      {...props}
      size="xl"
    
      // centered

      dialogClassName="modal-90w"
     
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="p-0 m-0">
        <embed
          src={`${import.meta.env.VITE_FILE_DOC_URL}${props?.virtual}`}
          type="application/pdf"
          width="100%"
          height="800px"
        />
      </Modal.Body>

    </Modal>
  );
};

export default VirtualBookView;

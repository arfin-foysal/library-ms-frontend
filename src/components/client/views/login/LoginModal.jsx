
import Modal from "react-bootstrap/Modal";
import Login from "./Login";


function LoginModal({show,handleClose}) {

  return (
    <>
      <Modal show={show} onHide={handleClose}>

        <Modal.Body>
          <Login />
        </Modal.Body>
 
      </Modal>
    </>
  );
}

export default LoginModal;

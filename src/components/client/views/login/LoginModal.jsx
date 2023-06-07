
import Modal from "react-bootstrap/Modal";
import Login from "./ClientLogin";


function LoginModal({show,handleClose}) {

  return (
    <>
      <Modal show={show} onHide={handleClose}  >
        <Modal.Body style={{ backgroundColor:"#033D75"}} >
          <Login />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;

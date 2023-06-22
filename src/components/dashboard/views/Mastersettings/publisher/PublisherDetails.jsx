import React from "react";
import avatar from "../../../../../assets/images/profile-picture.png";
import { Button, Modal } from "react-bootstrap";
const PublisherDetails = ({ handleClose, param }) => {


  return (
    <div>
      <h5>Publisher Details</h5>

      <div>
        {param?.photo ? (
          <>
            <img
              className="img-fluid rounded-circle shadow"
              style={{ width: "80px", height: "80px" }}
              src={`${import.meta.env.VITE_FILE_URL}${param?.photo}`}
              alt=""
            ></img>
          </>
        ) : (
          <img
            className="img-fluid rounded-circle shadow"
            style={{ width: "80px", height: "80px" }}
            src={avatar}
            alt=""
          ></img>
        )}
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <p>
              Name:
              <span className="font-weight-bold text-primary ">{param.name}</span>
            </p>
            <p>
              Email:
              <span className="font-weight-bold text-primary ">{param.email}</span>
            </p>
            <p>
              Mobile:
              <span className="font-weight-bold text-primary ">
                {param.mobile}
              </span>
            </p>
            <p>
              contact :
              <span className="font-weight-bold text-primary ">
                {param.contact}
              </span>
            </p>
          </div>
          <div className="col-6 ">
            <p>
              Present Addres :
              <span className="font-weight-bold text-primary ">
                {param.address1}
              </span>
            </p>
            <p>
              permanent Addres :
              <span className="font-weight-bold text-primary ">
                {param.address2}
              </span>
            </p>
            <p>
              Bio :
              <span className="font-weight-bold text-primary ">{param.bio}</span>
            </p>

            <p>
              Is Active:
              <span className="font-weight-bold text-primary">
                {param.is_active === true ? "Active" : "Inactive"}
              </span>
            </p>
          </div>
        </div>
        <Modal.Footer>
          <div>
            <Button variant="dark" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </div>
    </div>
  );
};

export default PublisherDetails;

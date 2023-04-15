import React from "react";
import avatar from "../../../../../assets/images/profile-picture.png";
import { Button, Modal } from "react-bootstrap";
const VendorDetails = ({ handleClose, param }) => {


  return (
    <div>
      <h5>Vendor Details</h5>

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
              <span class="font-weight-bold text-primary ">{param.name}</span>
            </p>
            <p>
              Email:
              <span class="font-weight-bold text-primary ">{param.email}</span>
            </p>
            <p>
              Mobile:
              <span class="font-weight-bold text-primary ">
                {param.mobile}
              </span>
            </p>
            <p>
            Contact Person :
              <span class="font-weight-bold text-primary ">
                {param.contact_person}
              </span>
            </p>
            <p>
            Primary Supply Products :
              <span class="font-weight-bold text-primary ">
                {param.primary_supply_products}
              </span>
            </p>
          </div>
          <div className="col-6 ">
            <p>
            Contact Person Mobile :
              <span class="font-weight-bold text-primary ">
                {param.contact_person_mobile}
              </span>
            </p>
            <p>
            Office Address :
              <span class="font-weight-bold text-primary ">
                {param.office_address}
              </span>
            </p>
            <p>
            Warehouse Address :
              <span class="font-weight-bold text-primary ">{param.warehouse_address}</span>
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

export default VendorDetails;

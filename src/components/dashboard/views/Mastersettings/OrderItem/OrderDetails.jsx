import moment from "moment";
import React from "react";
import { FaBars } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";

const OrderDetails = ({ handleClose, values }) => {

  return (
    <div>
      <div className="row">

        <div >

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Order No:</th>
                <th>{values?.order_no}</th>
              </tr>
              <tr>
                <th>vendor :</th>
                <th>{values?.vendor_name}</th>
              </tr>
              <tr>
                <th>Received Date:</th>
                <th>{moment(values?.tentative_date).format("MMMM Do YYYY")}</th>
                
              </tr>
              <tr>
                <th>Total Quantity:</th>
                <th>{values?.qty}</th>
              </tr>
        

              <tr>
                <th>Status:</th>
                
                <th>
               {values?.order_status === "received" ? (
                    <>
                      <span className="badge bg-info">Received</span>
                    </>
                  ) : (
                    <span className="badge bg-danger">Unreceived</span>
                  )} 
                    
             
                
                </th>
              </tr>
              <tr>
                <th>Note:</th>
                <th>{values?.note}</th>
              </tr>

            </thead>
          </table>
          <div className="alert alert-secondary " role="alert">
           <FaBars className="mb-1"/> Item List
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
       
                <th scope="col">Quantity</th>
          
              </tr>
            </thead>
            <tbody>
              {" "}
              {values?.items?.map((item) => (
                <tr>
                  <th>
                    <img
                      width={50}
                      height={50}
                      src={`${import.meta.env.VITE_FILE_URL}${item?.item_photo
                        }`}
                      alt=""
                    />
                  </th>
                  <td>{item.item_name}</td>
        
                  <td>{item.item_qty}</td>
         
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

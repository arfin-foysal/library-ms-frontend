import moment from "moment";
import React from "react";
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
                <th>vendor Name :</th>
                <th>{values?.vendor_name}</th>
              </tr>
              <tr>
                <th>Received Date:</th>
                <th>{moment(values?.tentative_date).format("MMMM Do YYYY")}</th>
                
              </tr>
              <tr>
                <th>Qty:</th>
                <th>{values?.qty}</th>
              </tr>
        

              <tr>
                <th>Order Status:</th>
                <th>{values?.order_status}</th>
              </tr>
              <tr>
                <th>Note:</th>
                <th>{values?.note}</th>
              </tr>

            </thead>
          </table>
          <div className="alert alert-secondary text-center" role="alert">
            Item Details
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Item Photo</th>
                <th scope="col">Item Name</th>
       
                <th scope="col">Item Qty</th>
          
              </tr>
            </thead>
            <tbody>
              {" "}
              {values?.items?.map((item) => (
                <tr>
                  <th>
                    <img
                      width={50}
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

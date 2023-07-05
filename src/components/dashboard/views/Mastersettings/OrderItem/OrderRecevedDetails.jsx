import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";

const OrderRecevedDetails = ({ handleClose, values }) => {



  return (
    <div>
      <div className="row">

              <div >
             
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Receved No:</th>
                <th>{values?.receive_no}</th>
              </tr>
              <tr>
                <th>Invoice No:</th>
                <th>{values?.invoice_no}</th>
              </tr>
              <tr>
                <th>vendor Name :</th>
                <th>{values?.vendor_name}</th>
              </tr>
              <tr>
                <th>Receved Date:</th>
                <th>{values?.received_date}</th>
              </tr>
              <tr>
                <th>Qty:</th>
                <th>{values?.qty}</th>
              </tr>
              <tr>
                <th>
                  Discount Before Amount: 
                </th>
                <th><TbCurrencyTaka />{values?.sub_total_amount} Tk</th>
              </tr>
              <tr>
                <th>
                  Discount: 
                </th>
                <th><TbCurrencyTaka />{values?.discount} Tk</th>
              </tr>


              <tr>
                <th>Payable Amount:</th>
                <th><TbCurrencyTaka />{values?.payable_amount} Tk</th>
              </tr>
              <tr>
                <th>Paid Amount:</th>
                <th><TbCurrencyTaka />{values?.paid_amount} Tk</th>
              </tr>
              <tr>
                <th>Due Amount:</th>
                <th><TbCurrencyTaka />{values?.due_amount} Tk</th>
              </tr>
              <tr>
                <th>Order Status:</th>
                <th>{values?.payment_status}</th>
              </tr>
              <tr>
                <th>Comments:</th>
                <th>{values?.comments}</th>
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
                <th scope="col">Item Price</th>
                <th scope="col">Item Qty</th>
                <th scope="col">Item Total Price</th>
              </tr>
            </thead>
            <tbody>
              {" "}
              {values?.items?.map((item) => (
                <tr>
                  <th>
                    <img
                      width={50}
                      src={`${import.meta.env.VITE_FILE_URL}${
                        item?.item_photo
                      }`}
                      alt=""
                    />
                  </th>
                  <td>{item.item_name}</td>
                  <td><TbCurrencyTaka />{item.item_price} Tk</td>
                  <td>{item.item_qty}</td>
                  <td><TbCurrencyTaka />{item.total_price} Tk</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderRecevedDetails;

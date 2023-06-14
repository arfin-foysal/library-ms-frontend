import React from "react";

const OrderRecevedDetails = ({ handleClose, values }) => {



  return (
    <div>
      <div className="row">

              <div >
             
          <table class="table table-bordered">
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
                <th>Payable Amount:</th>
                <th>{values?.payable_amount}</th>
              </tr>
              <tr>
                <th>Paid Amount:</th>
                <th>{values?.paid_amount}</th>
              </tr>
              <tr>
                <th>Due Amount:</th>
                <th>{values?.due_amount}</th>
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
          <div class="alert alert-secondary text-center" role="alert">
  Item Details
</div>
          <table class="table table-bordered">
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
                  <td>{item.item_price}</td>
                  <td>{item.item_qty}</td>
                  <td>{item.total_price}</td>
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

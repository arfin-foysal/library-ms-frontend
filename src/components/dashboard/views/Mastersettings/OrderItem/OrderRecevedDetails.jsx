import React from "react";
import { FaBars } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";

const OrderRecevedDetails = ({ handleClose, values }) => {



  return (
    <div>
      <div className="row">

        <div >

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Received No:</th>
                <th>{values?.receive_no}</th>
              </tr>
              <tr>
                <th>Invoice No:</th>
                <th>{values?.invoice_no}</th>
              </tr>
              <tr>
                <th>vendor:</th>
                <th>{values?.vendor_name}</th>
              </tr>
              <tr>
                <th>Received Date:</th>
                <th>{values?.received_date}</th>
              </tr>
              <tr>
                <th>
                  Total Quantity:
                </th>
                <th>{values?.qty}</th>
              </tr>
              <tr>
                <th>
                  Sub Total:
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
                <th>Net Payable Amount:</th>
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
                <th>Payment :</th>
                <th>
                  {
                    values?.payment_status === "paid" && (
                      <>
                        <span className="badge bg-success">Paid</span>
                      </>
                    )

                  }
                  {
                    values?.payment_status === "due" && (
                      <>
                        <span className="badge bg-secondary">Due</span>
                      </>
                    )

                  }
                  {
                    values?.payment_status === "paid" && (
                      <>
                        <span className="badge bg-success"></span>
                      </>
                    )
                  }





                </th>
              </tr>
              <tr>
                <th>Remarks:</th>
                <th>{values?.comments}</th>
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
                <th scope="col">Price</th>
                <th scope="col">Quantity </th>
                <th scope="col">Total Price</th>
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

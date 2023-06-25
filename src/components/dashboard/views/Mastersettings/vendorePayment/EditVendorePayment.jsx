import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { useVendorPaymentUpdateMutation } from "../../../../../services/vendorApi";
import { TbCurrencyTaka } from "react-icons/tb";
const EditVendorePayment = ({ handleClose, param }) => {

  const [vendorPaymentUpdate, res] = useVendorPaymentUpdateMutation();






  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      vendor_payment_no: param?.vendor_payment_no,
      vendor_name: param?.vendor_name,
      invoice_no: param?.invoice_no,
      payment_through: param?.payment_through,
      payable_amount: param?.payable_amount,
      paid_amount: param?.paid_amount,
      due_amount: param?.due_amount,
      comments: param?.comments,
      item_receive_id: param?.item_receive_id,
      payment_status: param?.payment_status,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("id", param?.id);
      formData.append("item_receive_id", values.item_receive_id);
      formData.append("vendor_payment_no", values.vendor_payment_no);
      formData.append("vendor_name", values.vendor_name);
      formData.append("invoice_no", values.invoice_no);
      formData.append("payment_through", values.payment_through);
      formData.append("payable_amount", values.payable_amount);
      formData.append("paid_amount", values.paid_amount);
      formData.append("due_amount", values.due_amount);
      formData.append("comments", values.comments);
      formData.append("payment_status", values.payment_status);
  
      resetForm();

      try {
        // console.log(values);
        const result = await vendorPaymentUpdate(formData).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.warn(error.data.message);
      }
    },



  });


  const paidHandler = (value) => {
    formik.setFieldValue("paid_amount", value);
    formik.setFieldValue("due_amount", formik.values.payable_amount - value);

    if(value>formik.values.payable_amount){
      toast.warn("Paid Amount Can't be greater than Payable Amount");
      formik.setFieldValue("paid_amount", 0);
      formik.setFieldValue("due_amount", formik.values.payable_amount);
    }
  }




  if (res.isSuccess) {
    handleClose();
  }

  return (
    <div>
      <form
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="col-12 border border-2">
            <div className="row py-2">
              <div className="col-3">
                <label className="col-12 col-form-label">
                  Vendor Payment No
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="vendor_id"
                  onChange={formik.handleChange}
                  value={formik.values.vendor_payment_no}
                  required
                  disabled
                />
              </div>

              <div className="col-3">
                <label className="col-12 col-form-label">Vendor Name</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Vendor Name"
                    type="text"
                    className="form-control"
                    name="vendor_name"
                    onChange={formik.handleChange}
                    value={formik.values.vendor_name}
                    required
                    disabled
                  />
                </div>
              </div>
              <div className="col-3">
                <label className="col-12 col-form-label">Invoice No</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Vendor Name"
                    type="text"
                    className="form-control"
                    name="invoice_no"
                    onChange={formik.handleChange}
                    value={formik.values.invoice_no}
                    required
                    disabled
                  />
                </div>
              </div>
              <div className="col-3">
                <label className="col-12 col-form-label">Payment Status</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Vendor Name"
                    type="text"
                    className="form-control"
                    name="payment_status"
                    onChange={formik.handleChange}
                    value={formik.values.payment_status}
                    required
                    disabled
                  />
                </div>
              </div>

              <div className="col-6">
                <label className="col-12 col-form-label">Note</label>
                <div className="col-12">
                  <textarea
                    rows={4}
                    placeholder="Enter Note"
                    type="text"
                    className="form-control"
                    name="comments"
                    onChange={formik.handleChange}
                    value={formik.values.comments}
                    required
                  />
                </div>
              </div>
              <div className="col-6 border my-4">
                <table className="table table-white table-striped">
                  <thead>
                    <tr>
                      <th scope="col">PayableAmount:</th>
                      <th scope="col"><TbCurrencyTaka />{formik.values.payable_amount} TK</th>
                    </tr>
                    <tr>
                      <th scope="col">Paid Amount:</th>
                      <th scope="col">
                        <input
                          className="form-control"
                          type="number"
                          value={formik.values.paid_amount}
                          max={formik.values.payable_amount}
                          min={0}
                          onChange={(e) => { paidHandler(e.target.value) }}
                        />
                      </th>
                    </tr>
                    <tr>
                      <th scope="col">Due Amount :</th>
                      <th scope="col"><TbCurrencyTaka />{formik.values.due_amount} TK</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                </table>
                <div className="row pb-2">
                  <label className="col-6 col-form-label fw-bold">
                    Payment Through :
                  </label>

                  <div className="col-6">
                    <select
                      className="form-control"
                      name="payment_through"
                      onChange={formik.handleChange}
                      value={formik.values.payment_through}
                      required
                    >
                      <option value="">--Select--</option>
                      <option value="Cash">Cash</option>
                      <option value="Bank">Bank</option>
                      <option value="check">Check</option>
                
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    
        <Modal.Footer>
          <div className=" d-flex">
            
              <button className="btn btn-dark me-1" onClick={handleClose}>
                Close
              </button>
           
          
              <button type="submit" className="btn btn-success ">
                Submit
              </button>
         
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default EditVendorePayment;

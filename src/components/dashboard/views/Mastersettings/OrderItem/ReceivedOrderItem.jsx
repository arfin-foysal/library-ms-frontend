import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import {  Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import { useGetVendorListQuery } from "../../../../../services/vendorApi";
import { useGetBookItemListQuery, useGetItemForSelectFieldQuery } from "../../../../../services/bookItemApi";

import {
  useItemOrderMutation,
  useItemOrderRecevedMutation,
  useUnrecevedItemByOrderIdQuery,
} from "../../../../../services/itemOrder";
import PageTopHeader from "../../../common/PageTopHeader";
import { useNavigate, useParams } from "react-router-dom";
import { TbCurrencyTaka } from "react-icons/tb";

const ReceivedOrderItem = ({ handleClose }) => {
  const bookItemRes = useGetItemForSelectFieldQuery();
  const navigate = useNavigate();
  const { id } = useParams();
  const [itemOrderReceved, res] = useItemOrderRecevedMutation();
  const unrecevedOrderRes = useUnrecevedItemByOrderIdQuery(id);

  const vendorRes = useGetVendorListQuery();
  const [discount, setDiscount] = useState(0);
  const [allItem, setAllItem] = useState([]);




  const unrecevedOrder = () => {
    let data = [];
    unrecevedOrderRes?.data?.data.items?.map((item) => {
      data.push({
        id: item.id,
        item_photo: item.item_photo,
        item_name: item.item_name,
        item_qty: item.item_qty,
        item_price: item.item_price,
        total_price: item.total_price,
        item_id: item.item_id,
        item_order_id: item.item_order_id,
      });
    });
    setAllItem(data);
  };

  useEffect(() => {
    unrecevedOrder();
  }, [unrecevedOrderRes]);

  const deleteItem = (item) => {
    let newData = allItem.filter((data) => {
      return data.id != item.id;
    });
    setAllItem(newData);
  };

  const priceHandeler = (e) => {

    let price = e.target.value;
    let id = e.target.id;

    let newData = allItem.map((item) => {
      if (item.id == id) {
        item.item_price = price;
        item.total_price = item.item_price * item.item_qty;
        return item;
      } else {
        return item;
      }
    }
    );
    setAllItem(newData);
  };

  const qtyHandelar = (e) => {
    let qty = e.target.value;
    let id = e.target.id;

    let newData = allItem.map((item) => {
      if (item.id == id) {
        item.item_qty = qty;
        item.total_price = item.item_price * item.item_qty;
        return item;
      } else {
        return item;
      }
    });
    setAllItem(newData);
  };

  //calculation
  const subTotal = allItem.reduce((acc, item) => {
    return acc + item.total_price;
  }, 0);

  const totalQty = allItem.reduce((acc, item) => {
    return acc + Number(item.item_qty);
  }, 0);

  let totalAmount = subTotal;

  if (discount > 0) {
    if (discount > subTotal) {
      toast.warn("Discount is not more than total price");
      setDiscount(0);
      // return;
    }
    totalAmount = subTotal - discount;
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      vendor_id: unrecevedOrderRes?.data?.data?.vendor_id,
      // tentative_date: unrecevedOrderRes?.data?.data?.tentative_date,
      comments: "",
      invoice_no: "",
    },

    onSubmit: async (values, { resetForm }) => {
      // let formData = new FormData();

      const data = {
        vendor_id: Number(values.vendor_id),
        tentative_date: values.tentative_date,
        comments: values.comments,
        is_active: values.is_active,
        qty: totalQty,
        item_order_id: unrecevedOrderRes?.data?.data?.id,
        invoice_no: values.invoice_no,
        total: Number(totalAmount),
        discount: Number(discount),
        amount: Number(subTotal),
        order_items: allItem,
      };

      try {
        const result = await itemOrderReceved(data).unwrap();
        toast.success(result.message);
        resetForm();
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

  if (res.isSuccess) {


    navigate("/dashboard/order-list");

  }

  return (
    <>
      <PageTopHeader title="Received Order" />
      <div className="card border shadow-lg">
        <div className="card-header d-flex justify-content-between ">
          <div>Received Order</div>
        </div>
        <div className="card-body ">
          <div>
            <form
              className="form-sample"
              onSubmit={formik.handleSubmit}
              encType="multipart/form-data"
            >
              <div className="row">
                <div className="col-12 ">
                  <div className="row py-2">
                    <div className="col-4">
                      <label className="col-12 col-form-label">Vendor</label>
                      <select
                        disabled
                        className="form-control"
                        name="vendor_id"
                        onChange={formik.handleChange}
                        value={formik.values.vendor_id}
                        required
                      >
                        <option value="">Select Vendor</option>
                        {vendorRes?.data &&
                          vendorRes?.data?.data?.map((vendor, i) => (
                            <option key={i} value={vendor.id}>
                              {vendor.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="col-4">
                      <label className="col-12 col-form-label">
                        Receive Date
                      </label>
                      <div className="col-12">
                        <input
                          placeholder="Enter Tentative Date"
                          type="date"
                          className="form-control"
                          name="tentative_date"
                          onChange={formik.handleChange}
                          value={formik.values.tentative_date}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-4 ">
                      <label className="col-12 col-form-label">
                        Invoice No
                      </label>
                      <div className="col-12">
                        <input
                          placeholder="
                          Enter Invoice No
                          "
                          type="text"
                          className="form-control"
                          name="invoice_no"
                          onChange={formik.handleChange}
                          value={formik.values.invoice_no}
                          required
                        />
                      </div>
                    </div>

                    

                    <div className="col-3">
                      <label className="col-12 col-form-label">Item</label>
                      <Select
                        // isMulti
                        name="item_id"
                        placeholder="Select item"
                        classNamePrefix="select"
                        // onChange={(e) => setItem(e)}
                        getOptionValue={(option) => `${option["id"]}`}
                        getOptionLabel={(option) => `${option["title"]} ( ${option["barcode_or_rfid"]} )`}
                        options={bookItemRes.isSuccess && bookItemRes.data?.data}
                        isLoading={bookItemRes.isLoading}
                        enter to next field after select
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            // qtyRef.current.focus();
                          }
                        }}
                      />
                    </div>

                    <div className="col-3">
                      <label className="col-12 col-form-label">Quantity</label>
                      <div className="col-12">
                        <input
                          placeholder="Quantity"
                          type="number"
                          className="form-control"
                          name="item_qty"
                        // onChange={(e) => qtyHandeler(e)}
                        // value={item_qty}
                        // ref={qtyRef}


                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <label className="col-12 col-form-label">Item Price</label>
                      <div className="col-12">
                        <input
                          placeholder="Item Price"
                          type="number"
                          className="form-control"
                          name="item_qty"
                        // onChange={(e) => qtyHandeler(e)}
                        // value={item_qty}
                        // ref={qtyRef}


                        />
                      </div>
                    </div>



                    <div className="col-3 " style={{ marginTop: "37px" }}>
                      <button
                        // onClick={itemHandeler}
                        className="btn btn-primary d-block w-100"
                      >
                        Add
                      </button>
                    </div>

                    <div className="py-2 pb-3 my-4 ">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Photo</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Item Price</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {allItem?.map((item, i) => (
                            <tr key={i}>
                              <td className="col-2">
                                {" "}
                                <img
                                  width={40}
                                  height={40}
                                  src={`${import.meta.env.VITE_FILE_URL}${item?.item_photo
                                    }`}
                                  alt=""
                                />
                              </td>
                              <td>{item.item_name}</td>
                              {/* {item.item_qty} */}

                              <td className="col-2">
                                <input
                                  type="number"
                                  id={item.id}
                                  className="form-control"
                                  value={item.item_qty}
                                  onChange={(e) => {
                                    qtyHandelar(e);
                                  }}
                                />
                              </td>
                              <td className="col-2"> <input
                                placeholder="Price"
                                type="number"
                                className="form-control"
                                id={item.id}
                                name="item_price"
                                onChange={(e) => priceHandeler(e)}
                                value={item.item_price}
                              />



                              </td>
                              <td className="col-2 pt-3 "><TbCurrencyTaka />{item.total_price} TK</td>

                              <td className="col-2 pt-3">
                                <button
                                  onClick={() => deleteItem(item)}
                                  className="btn btn-danger btn-sm"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="col-6">
                      <label className="col-12 col-form-label">Comment</label>
                      <div className="col-12">
                        <textarea
                          rows={4}
                          placeholder="Enter Comments"
                          type="text"
                          className="form-control"
                          name="comments"
                          onChange={formik.handleChange}
                          value={formik.values.comments}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-6 border ">
                      <table className="table table-white table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Sub Total Amount :</th>
                            <th scope="col"><TbCurrencyTaka />{subTotal} TK</th>
                          </tr>
                          <tr>
                            <th scope="col">Discount:</th>
                            <th scope="col">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Discount"
                                // name="discount"
                                value={discount}
                                max={subTotal}
                                min={0}
                                onChange={(e) => {
                                  setDiscount(e.target.value);
                                }}
                              />
                            </th>
                          </tr>
                          <tr>
                            <th scope="col">Total Amount :</th>
                            <th scope="col"><TbCurrencyTaka />{totalAmount} TK</th>
                          </tr>
                        </thead>
                      </table>
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
        </div>
      </div>
    </>
  );
};

export default ReceivedOrderItem;

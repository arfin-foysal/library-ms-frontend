import { useFormik } from "formik";
import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "react-bootstrap";
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
import BookItemModal from "../bookItem/BookItemModal";
import { BiCartAdd } from "react-icons/bi";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import PreviewModal from "./PreviewModal/PreviewModal";

const ReceivedOrderItem = () => {
  const bookItemRes = useGetItemForSelectFieldQuery();
  const navigate = useNavigate();
  const { id } = useParams();
  const [itemOrderReceved, res] = useItemOrderRecevedMutation();
  const unreceivedOrderRes = useUnrecevedItemByOrderIdQuery(id);

  const vendorRes = useGetVendorListQuery();
  const [discount, setDiscount] = useState(0);
  const [allItem, setAllItem] = useState([]);
  const [item, setItem] = useState();


  const [clickValue, setClickValue] = useState(null);
  const [paramId, setParamId] = useState(null);
  const [previewData,setPreviewData]=useState()

  const [show, setShow] = useState(false);


  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewClose = () => setShowPreview(false);
  const handlePreviewShow = () => setShowPreview(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);




  const unrecevedOrder = () => {
    let data = [];

    unreceivedOrderRes?.data?.data.items?.map((item) => {

      data.push({
        id: item.id,
        item_photo: item.item_photo,
        item_name: item.item_name,
        item_qty: item.item_qty,
        item_price: item.item_price,
        total_price: item.total_price,
        item_id: item.item_id,
        item_order_id: item.item_order_id,
        isbn: item.isbn,
        edition: item.edition,
      });
    });
    setAllItem(data);
  };

  useEffect(() => {
    unrecevedOrder();
  }, [unreceivedOrderRes]);


  const itemHandler = (e) => {
    e.preventDefault();

    let data = [];


    data.push({
      id: item.id,
      item_photo: item.photo,
      item_name: item.title,
      item_qty: 0,
      item_price: 0,
      total_price: 0,
      isbn: item.isbn,
      edition: item.edition,
      item_id: item.id,
      item_order_id: unreceivedOrderRes?.data?.data?.id,
    });

    //same item not add

    let isExist = allItem.find((item) => item.item_id == data[0].id);
    if (isExist) {
      toast.warn("Item already added");
      return;
    }
    setAllItem([...allItem, ...data]);

  };






  const deleteItem = (item) => {
    let newData = allItem.filter((data) => {
      return data.id != item.id;
    });
    setAllItem(newData);
  };

  const priceHandler = (e) => {

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

  const isbnHandler = (e) => {
    let isbn = e.target.value;
    let id = e.target.id;

    let newData = allItem.map((item) => {
      if (item.id == id) {
        item.isbn = isbn;
        return item;
      } else {
        return item;
      }
    });
    setAllItem(newData);
  };

  const editionHandler = (e) => {
    let edition = e.target.value;
    let id = e.target.id;

    let newData = allItem.map((item) => {
      if (item.id == id) {
        item.edition = edition;
        return item;
      } else {
        return item;
      }
    });
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

  const handelPreviewData = () => {
    setPreviewData(
      {
        order_no: unreceivedOrderRes?.data?.data?.order_no,
        vendor_name: unreceivedOrderRes?.data?.data?.vendor_name,
        vendor_address: unreceivedOrderRes?.data?.data?.vendor_office_address,
        vendor_mobile: unreceivedOrderRes?.data?.data?.vendor_mobile,
        vendor_email: unreceivedOrderRes?.data?.data?.vendor_email,
        comments: formik.values.comments,
        invoice_no: formik.values.invoice_no,
        received_date: formik.values.tentative_date,
        total_qty: totalQty,
        sub_total: subTotal,
        discount: discount,
        total_amount: totalAmount,
        items: allItem,

      }
    )
   
  }



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      vendor_id: unreceivedOrderRes?.data?.data?.vendor_id,
      order_no: unreceivedOrderRes?.data?.data?.order_no,
      comments: "",
      invoice_no: "",
    },

    onSubmit: async (values, { resetForm }) => {

      // quantity and price validation
      let isQtyValid = allItem.find((item) => item.item_qty == 0);
      if (isQtyValid) {
        toast.warn("Quantity can't be zero");
        return;
      }

      let isPriceValid = allItem.find((item) => item.item_price == 0);
      if (isPriceValid) {
        toast.warn("Price can't be zero");
        return;
      }

 



      const data = {
        vendor_id: Number(values.vendor_id),
        tentative_date: values.tentative_date,
        comments: values.comments,
        is_active: values.is_active,
        qty: totalQty,
        item_order_id: unreceivedOrderRes?.data?.data?.id,
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
      
      <PreviewModal
        show={showPreview}
        handleClose={handlePreviewClose}
        data={previewData}
      />
      
      <BookItemModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
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
                    <div className="col-3">
                      <label className="col-12 col-form-label">
                        Order ID
                      </label>
                      <div className="col-12">
                        <input
                          disabled
                          placeholder="Order Number"
                          type="text"
                          className="form-control"
                          name="order_no"
                          onChange={formik.handleChange}
                          value={formik.values.order_no}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-3">
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


                    <div className="col-3">
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

                    <div className="col-3 ">
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




                    <div className="row pt-5">

                      <div className="col">
                      </div>
                      <div className="col">

                        <div className="row">
                          <div className="col text-end">

                            <button className="btn btn-primary btn-sm"

                              onClick={() => {
                                handleShow();
                                handelClickValue("Add New Item");
                              }}
                            >
                               <FiPlusCircle size={16}/> Create New Item
                            </button>


                          </div>
                          <label className="col-12 col-form-label">
                            Item
                          </label>
                          <div className="col-8">

                            <Select

                              name="item_id"
                              placeholder="Select item"
                              classNamePrefix="select"
                              onChange={(e) => setItem(e)}
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
                          <div className="col-4">
                            <div className=" text-end">
                              <button
                                onClick={itemHandler}
                                className="btn btn-primary mt-1 btn-sm 
                                d-block w-100
                                "
                              >
                                 <FiPlusCircle size={16}/> Add
                              </button>
                            </div>
                          </div>

                        </div>



                      </div>
                    </div>

                    <div className="py-2 pb-3 my-4 ">
                      <table className="table border border-3 ">
                        <thead>
                          <tr>
                            <th scope="col">Photo</th>
                            <th scope="col">Item</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Edition</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Item Price</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>

                        {
                          allItem?.length === 0 ? (

                            <div class="spinner-border text-primary " role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>



                          ) : (<tbody>
                            {allItem?.map((item, i) => (

                              <tr key={i}>
                                <td className="col">

                                  <img
                                    width={40}
                                    height={40}
                                    src={`${import.meta.env.VITE_FILE_URL}${item?.item_photo
                                      }`}
                                    alt=""
                                  />
                                </td>

                                <td className="col-3">{item.item_name.substring(0, 20)}</td>

                                <td className="col-2">
                                  <input
                                    placeholder="Enter Isbn"
                                    type="text"
                                    className="form-control"
                                    id={item.id}
                                    name="isbn"
                                    onChange={(e) => isbnHandler(e)}
                                    value={item?.isbn}

                                  />


                                </td>


                                <td className="col-2">
                                  <input
                                    placeholder="Enter Edition"
                                    type="text"
                                    className="form-control"
                                    id={item.id}
                                    name="edition"
                                    onChange={(e) => editionHandler(e)}
                                    value={item?.edition}


                                  />
                                </td>



                                <td className="col-1">
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

                                <td className="col-2">
                                  <input
                                    placeholder="Price"
                                    type="number"
                                    className="form-control"
                                    id={item.id}
                                    name="item_price"
                                    onChange={(e) => priceHandler(e)}
                                    value={item.item_price}
                                  />





                                </td>
                                <td className="col-2 pt-3 "><TbCurrencyTaka />{item.total_price} Tk</td>

                                <td className="col-1 pt-3 ">
                                  <button
                                    onClick={() => deleteItem(item)}
                                    className="btn btn-danger btn-sm d-flex"
                                  >
                                     <FaTrash size={13}  /> 
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>)

                        }




                      </table>
                    </div>

                    <div className="col-6">
                      <label className="col-12 col-form-label">Remarks</label>
                      <div className="col-12">
                        <textarea
                          rows={4}
                          placeholder="Enter Remarks"
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
                            <th scope="col">Total Quantity :</th>
                            <th scope="col">{totalQty} Item</th>
                          </tr>
                          <tr>
                            <th scope="col">Sub Total Amount :</th>
                            <th scope="col"><TbCurrencyTaka />{subTotal} Tk</th>
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
                            <th scope="col"><TbCurrencyTaka />{totalAmount} Tk</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                </div>
              </div>


              <Modal.Footer>
                <div className=" d-flex">
         
                  <button
                    onClick={(e) => { handlePreviewShow(e); handelPreviewData(e)}}
                    className="btn btn-primary me-1"
                  >
                    Preview
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

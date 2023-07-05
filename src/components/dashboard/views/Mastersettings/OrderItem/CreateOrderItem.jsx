import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Select from "react-select";
import { useGetVendorListQuery } from "../../../../../services/vendorApi";
import { useGetItemForSelectFieldQuery } from "../../../../../services/bookItemApi";
import { useItemOrderMutation } from "../../../../../services/itemOrder";


const CreateOrderItem = ({ handleClose }) => {
  const [itemOrder, res] = useItemOrderMutation();

  console.log(res)


  const vendorRes = useGetVendorListQuery();
  const bookItemRes = useGetItemForSelectFieldQuery();
  const [discount, setDiscount] = useState(0);
  const [allItem, setAllItem] = useState([]);
  const [item, setItem] = useState();
  const [item_qty, setItem_qty] = useState();
  // const [item_price, setItem_price] = useState();




  const qtyHandler = (e) => {
    setItem_qty(e.target.value);
  };
  // const priceHandeler = (e) => {
  //   setItem_price(e.target.value);
  // };

  const itemHandler = (e) => {


    const items = {
      item_qty: Number(item_qty),
      photo: item.photo,
      // item_price: Number(item_price),
      // amount: item_qty * item_price,
      item: item.id,
      itemName: item.title,
    };

    if (item_qty === "" || item === "") {
      toast.warn("Please fill all the field");
    } else {
      if (allItem.find((itemss) => itemss.item === item.id)) {
        toast.warn("Item already added");
      } else {
        setAllItem([...allItem, items]);
      }
    }

    setItem("");
    setItem_qty("");
    // setItem_price("");
  };

  const qtyRef = React.useRef();

  const subTotal = allItem.reduce((a, b) => a + b.amount, 0);

  let totalAmount;
  if (discount) {
    totalAmount = subTotal - discount;
  } else {
    totalAmount = subTotal;
  }
  if (totalAmount <= 0) {
    totalAmount = "0";
  }
  const totalQty = allItem.reduce((a, b) => a + b.item_qty, 0);

  // console.log(totalQty);

  const deleteItem = (id) => {
    const filterItem = allItem.filter((itemss) => itemss.item !== id.item);
    setAllItem(filterItem);
  };

  const formik = useFormik({
    initialValues: {
      vendor_id: "",
      tentative_date: "",
      note: "",
      is_active: false,
    },

    onSubmit: async (values, { resetForm }) => {
      // let formData = new FormData();

      const data = {
        vendor_id: Number(values.vendor_id),
        tentative_date: values.tentative_date,
        note: values.note,
        is_active: values.is_active,
        qty: totalQty,
        total: Number(totalAmount),
        discount: Number(discount),
        amount: Number(subTotal),
        order_items: allItem,
      };

      try {


        const result = await itemOrder(data).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

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
              <div className="col-4">
                <label className="col-12 col-form-label">Vendor</label>
                <select
                  className="form-control"
                  name="vendor_id"
                  onChange={formik.handleChange}
                  value={formik.values.vendor_id}
                  required
                >
                  <option value="">Select Vendor</option>
                  {vendorRes.isLoading && <option>...</option>}
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
                  Tentative Receive Date
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
              <div className="col-4 pt-4">
                <div className="row">
                  <label className="col-4 col-form-label">Is Active</label>
                  <div className="col-4">
                    <div class="form-check form-switch mt-2">
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Active"
                        name="is_active"
                        onChange={formik.handleChange}
                        value={formik.values.is_active}
                        checked={formik.values.is_active}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <label className="col-12 col-form-label">Item</label>
                <Select
                  // isMulti
                  name="item_id"
                  placeholder="Select item"
                  classNamePrefix="select"
                  onChange={(e) => setItem(e)}
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option["title"]} ( ${option["barcode_or_rfid"]} )`}
                  options={bookItemRes.isSuccess && bookItemRes.data?.data}
                  isLoading={bookItemRes.isLoading}
                  //enter to next field after select
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      qtyRef.current.focus();
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
                    onChange={(e) => qtyHandler(e)}
                    value={item_qty}
                    ref={qtyRef}


                  />
                </div>
              </div>

              {/* <div className="col-3">
                <label className="col-12 col-form-label">Price</label>
                <div className="col-12">
                  <input
                    placeholder="Price"
                    type="number"
                    className="form-control"
                    name="item_price"
                    onChange={(e) => priceHandeler(e)}
                    value={item_price}
                  />
                </div>
              </div> */}

              <div className="col-3 " style={{ marginTop: "37px" }}>
                <button
                  onClick={itemHandler}
                  className="btn btn-primary d-block w-100"
                >
                  Add
                </button>
              </div>

              <div className="py-2 pb-3 my-4 border border-4">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Photo</th>
                      <th scope="col">Name</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {allItem.map((item, i) => (
                      <tr key={i}>
                        <td className="col-2">
                          {" "}
                          <img
                            width={40}
                            height={40}
                            src={`${import.meta.env.VITE_FILE_URL}${item?.photo
                              }`}
                            alt=""
                          />
                        </td>
                        <td>{item.itemName}</td>
                        <td>{item.item_qty}</td>

                        <td>
                          <button
                            onClick={() => deleteItem(item)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="col-12">
                <label className="col-12 col-form-label">Note</label>
                <div className="col-12">
                  <textarea
                    maxLength={200}

                    rows={1}
                    placeholder="Enter Note"
                    type="text"
                    className="form-control"
                    name="note"
                    onChange={formik.handleChange}
                    value={formik.values.note}
                    required
                  />
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

export default CreateOrderItem;

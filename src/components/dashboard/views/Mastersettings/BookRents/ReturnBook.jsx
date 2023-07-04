import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useItemReturnMutation } from "../../../../../services/itemRentApi";
const ReturnBook = ({ handleClose, param }) => {
  const [itemReturn, res] = useItemReturnMutation();
  const [item, setItem] = useState();
  const [show, setShow] = useState(false);

  const rentsItem = () => {
    const data = [];
    param?.item_rents_Detail?.map((item) => {
      data.push({
        item_id: item.item_id,
        item_name: item.item_name,
        item_photo: item.item_photo,
        status: item.status,
        item_qty: item.item_qty,
        return_date: item.return_date,
        item_amount_of_penalty: item.item_amount_of_penalty,
      });
    });

    setItem(data);
  };

  useEffect(() => {
    rentsItem();
  }, []);

  const statusHandeler = (e) => {
    const data = item.map((item) => {
      if (item.item_id === e.item_id) {
        return {
          ...item,
          status: e.status,
        };
      } else {
        return item;
      }
    });
    setItem(data);
  };

  const amountPenaltyHandeler = (e) => {
    const data = item.map((item) => {
      if (item.item_id === e.item_id) {
        return {
          ...item,
          item_amount_of_penalty: e.item_amount_of_penalty,
        };
      } else {
        return item;
      }
    });
    setItem(data);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: param?.user_name,
      return_date: new Date().toISOString().slice(0, 10),
      comments: "",
      amount_of_penalty: param?.amount_of_penalty,
    },

    onSubmit: async (values, { resetForm }) => {
      const return_item = [];
      item?.map((item) => {
        if (item.status) {
          return_item.push({
            item_id: item.item_id,
            item_qty: item.item_qty,
            status: item.status,
            item_amount_of_penalty: item.item_amount_of_penalty
              ? item.item_amount_of_penalty
              : 0,
          });
        }
      });

      const data = {
        item_rental_id: param?.id,
        return_date: values.return_date,
        comments: values.comments,
        qty: return_item.reduce((a, b) => a + b.item_qty, 0),
        return_item: return_item,
        amount_of_penalty: return_item.reduce(
          (a, b) => a + Number(b.item_amount_of_penalty),
          0
        ),
      };

      try {
        if (data?.qty === 0) {
          toast.warn("Please Select Return Item");
          return;
        } else {
          // console.log(data);
          const result = await itemReturn(data).unwrap();
          toast.success(result.message);
          resetForm();
        }
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

  if (res.isSuccess) {
    handleClose();
  }

  return (
    <div className="card border shadow-lg">
      <div className="card-header d-flex justify-content-between ">
        <div>Item Rents List</div>
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
                  <div className="col-6">
                    <label className="col-12 col-form-label">Name</label>
                    <input
                      type="text"
                      disabled
                      className=" form-control"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </div>

                  <div className="col-6">
                    <label className="col-12 col-form-label">Return Date</label>
                    <div className="col-12">
                      <input
                        disabled
                        placeholder="Enter Tentative Date"
                        type="date"
                        className="form-control"
                        name="return_date"
                        onChange={formik.handleChange}
                        value={formik.values.return_date}
                        required
                      />
                    </div>
                  </div>

                  <div className="py-1  my-2 ">
                    <div className="alert alert-dark text-center" role="alert">
                      Book Rents List
                    </div>

                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Photo</th>
                          <th scope="col">Name</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Return Type</th>
                          <th
                            scope="col"
                            className={show ? "d-block" : "d-none"}
                          >
                            Penalty Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item?.length === 0 && (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <div className="alert alert-success" role="alert">
                                All Item Already Return
                              </div>
                            </td>
                          </tr>
                        )}

                        {item?.map((item) => (
                          <tr>
                            <td>
                              <img
                                alt="img"
                                style={{ width: "40px", height: "40px" }}
                                className="img-fluid rounded-circle shadow"
                                src={`${import.meta.env.VITE_FILE_URL}${item.item_photo
                                  }`}
                              />
                            </td>

                            <td>{item.item_name}</td>
                            <td>{item.item_qty}</td>

                            <td>
                              <select
                                className="form-control fw-bold"
                                defaultValue={
                                  item.status ? item.status : "return"
                                }
                                onChange={(e) => {
                                  statusHandeler({
                                    item_id: item.item_id,
                                    status: e.target.value,
                                  });
                                  setShow(
                                    e.target.value === "overdue" ||
                                      e.target.value === "damaged" ||
                                      e.target.value === "buy"
                                      ? true
                                      : false
                                  );
                                }}
                              >
                                <option value="return" className=" fw-bold text-success">Return</option>
                                <option value="rental" className=" fw-bold  text-warning">Not Return</option>
                                <option value="overdue" className=" fw-bold text-info">Overdue</option>
                                <option value="damaged" className=" fw-bold  text-danger">Damaged</option>
                                <option value="buy" className=" fw-bold text-secondary">Buy</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="number"
                                className={
                                  item.status === "overdue" ||
                                    item.status === "damaged" ||
                                    item.status === "buy"
                                    ? "d-block form-control"
                                    : "d-none"
                                }
                                name="amount_of_penalty"
                                placeholder="Penalty Amount"
                                value={item.item_amount_of_penalty}
                                onChange={(e) => {
                                  amountPenaltyHandeler({
                                    item_id: item.item_id,
                                    item_amount_of_penalty: e.target.value,
                                  });
                                }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="col-12">
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
                  {/* <div className="col-4 mt-5 ">Total Quantity: {} </div> */}
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
  );
};

export default ReturnBook;

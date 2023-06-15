import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from "../../../common/PageTopHeader";
import MaterialReactTable from "material-react-table";
import AuthorModal from "./OrderItemModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { confirmHandel } from "../../../../../utils/Alert";
import avatar from "../../../../../assets/images/profile-picture.png";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";
import { IoReceipt } from "react-icons/io5";

import {
  useAllItemOrderQuery,
  useDeleteItemOrderMutation,
} from "../../../../../services/itemOrder";
import { Link } from "react-router-dom";

const OrderItemList = () => {
  const res = useAllItemOrderQuery();

  const [deleteItemOrder] = useDeleteItemOrderMutation();

  const { data, isSuccess, isFetching, isError, error } = res;
  const [clickValue, setClickValue] = useState(null);
  const [paramId, setParamId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const handelDelete = async (id) => {
    const result = await deleteItemOrder(id).unwrap();
    toast.success(result.message);
  };

  const columns = useMemo(
    () => [
      // {
      //   accessorFn: (row) =>
      //     row?.photo ? (
      //       <>
      //         <img
      //           className="img-fluid rounded-circle shadow"
      //           style={{ width: "40px", height: "40px" }}
      //           src={`${import.meta.env.VITE_FILE_URL}${row?.photo}`}
      //           alt=""

      //         ></img>
      //       </>
      //     ) : (
      //       <img
      //         className="img-fluid rounded-circle shadow"
      //         style={{ width: "40px", height: "40px" }}
      //         src={avatar}
      //         alt=""
      //       ></img>
      //     ),

      //   id: "Photo",
      //   header: "Photo",
      //   size: 10,
      // },

      {
        accessorKey: "order_no", //access nested data with dot notation
        header: "Order No",
        size: 10,
      },
      {
        accessorKey: "vendor_name", //access nested data with dot notation
        header: "Vendor Name",
        size: 10,
      },

      {
        accessorKey: "qty", //normal accessorKey
        header: "Qty",
        size: 10,
      },
      {
        accessorKey: "amount", //normal accessorKey
        header: "Amount",
        size: 10,
      },
      {
        accessorKey: "discount", //normal accessorKey
        header: "Discount",
        size: 10,
      },
      {
        accessorKey: "total", //normal accessorKey
        header: "Total",
        size: 10,
      },
      {
        accessorKey: "tentative_date", //normal accessorKey
        header: "Tentative Date",
        size: 10,
      },

      {
        //accessorFn function that combines multiple data together
        accessorFn: (row) =>
          row?.order_status === "received" ? (
            <>
              <span className="badge bg-info">received</span>
            </>
          ) : (
            <span className="badge bg-danger">unreceived</span>
          ),

        id: "order Status",
        header: "Order Status",
      },
      // {
      //   //accessorFn function that combines multiple data together
      //   accessorFn: (row) =>
      //     row?.is_active === true ? (
      //       <>
      //         <span className="badge bg-info">Active</span>
      //       </>
      //     ) : (
      //       <span className="badge bg-danger">Inactive</span>
      //     ),

      //   id: "Status",
      //   header: "Status",
      // },
    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}
      <AuthorModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      <PageTopHeader title="Item Order" />
      <div class="card border shadow-lg">
        <div class="card-header d-flex justify-content-between ">
          <div>Item Order List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Item Order");
              }}
            >
              Add Item Order
            </button>
          </div>
        </div>

        <div class="card-body p-0 ">
          <MaterialReactTable
            columns={columns}
            data={isSuccess && data?.data}
            enableRowActions
            enableColumnActions
            positionActionsColumn="last"
            muiTopToolbarProps={{
              style: {
                backgroundColor: "#3f4d67",
              },
            }}
            // enablePagination="true"
            renderRowActions={(row, index) => (
              <>
                <div className="d-flex ">
                  <button
                    to="#"
                    className="btn btn-secondary btn-sm d-flex align-items-center"
                    onClick={() => {
                      handleShow();
                      handelClickValue("Order Information");
                      setParamId(row?.row?.original);
                    }}
                  >
                    {/* <div className="mr-1"><BsFillEyeFill color="black" size={18} /></div> */}
                    <div>Details</div>
                  </button>
                  {row?.row?.original?.order_status === "unreceived" && (
                    <>
                      <button
                        onClick={() =>
                          confirmHandel(
                            "error",
                            "Delete",
                            "#FF0000",
                            row?.row?.original?.id,
                            handelDelete
                          )
                        }
                        className="px-2 mx-2 d-flex align-items-center btn btn-danger btn-sm "
                      >
                        <div> Delete</div>
                        <div>
                          <FaTrash size={13} />
                        </div>
                      </button>

                      <Link
                        to={`/dashboard/receved-order-list/${row?.row?.original?.id}`}
                        className="px-2 d-flex align-items-center btn btn-info btn-sm"
                      >
                        <div>Received</div>
                        <div>
                          <IoReceipt size={13} />
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default OrderItemList;

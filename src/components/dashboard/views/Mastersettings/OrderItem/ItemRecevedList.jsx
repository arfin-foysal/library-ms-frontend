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
  useAllItemRecevedListQuery,
  useDeleteItemOrderMutation,
} from "../../../../../services/itemOrder";
import { Link } from "react-router-dom";

const ItemRecevedList = () => {
  const res = useAllItemRecevedListQuery();


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
        accessorKey: "receive_no", //access nested data with dot notation
        header: "Receive No",
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
        accessorKey: "payable_amount", //normal accessorKey
        header: "Payable Amount",
        size: 10,
      },
      {
        accessorKey: "paid_amount", //normal accessorKey
        header: "Paid Amount",
        size: 10,
      },
      {
        accessorKey: "due_amount", //normal accessorKey
        header: "Due Amount",
        size: 10,
      },
      {
        accessorKey: "received_date", //normal accessorKey
        header: "Received Date",
        size: 10,
      },

      {
        //accessorFn function that combines multiple data together
        accessorFn: (row) =>
        (row?.payment_status === "unpaid" && (
          <span className="badge bg-danger">Unpaid</span>
        )) ||
        (row?.payment_status === "paid" && (
          <span className="badge bg-success">Paid</span>
        )) ||
        (row?.payment_status === "due" && (
          <span className="badge bg-secondary">Due</span>
        )),

      id: "Payment Status",
      header: "Payment Status",
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
      <PageTopHeader title="Item Received List" />
      <div class="card border shadow-lg">
        <div class="card-header d-flex justify-content-between ">
          <div>Item Received List</div>
  
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
                  <div className="mx-1">
                    <button
                      to="#"
                      className="btn btn-secondary btn-sm d-flex align-items-center"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Receved Information");
                        setParamId(row?.row?.original);
                      }}
                    >
                      {/* <div className="mr-1"><BsFillEyeFill color="black" size={18} /></div> */}
                      <div>Details</div>
                    </button>
                  </div>

                </div>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ItemRecevedList;

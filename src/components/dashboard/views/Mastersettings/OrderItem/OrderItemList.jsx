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
import { TbCurrencyTaka } from "react-icons/tb"
import { PiKeyReturnFill } from "react-icons/pi"

import {
  useAllItemOrderQuery,
  useDeleteItemOrderMutation,
} from "../../../../../services/itemOrder";
import { Link } from "react-router-dom";
import moment from "moment";
import { FiPlusCircle } from "react-icons/fi";
import { BsFillEyeFill } from "react-icons/bs";

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


      {
        accessorKey: "order_no", //access nested data with dot notation
        header: "Order No",
        size: 10,
      },
      {
        accessorKey: "vendor_name", //access nested data with dot notation
        header: "Vendor",
        size: 10,
      },

      {
        accessorKey: "qty", //normal accessorKey
        header: "Quantity",
        size: 10,
      },


      {
        accessorFn: (row) =>
          row?.tentative_date && (
            <>{moment(row.tentative_date).format("MMMM Do YYYY")}</>
          ),

        id: "tentative_date",
        header: "Tentative Date",
        size: 10,
      },


      {
        //accessorFn function that combines multiple data together
        accessorFn: (row) =>
          row?.order_status === "received" ? (
            <>
              <span className="badge bg-info">Received</span>
            </>
          ) : (
            <span className="badge bg-danger">Unreceived</span>
          ),

        id: "order Status",
        header: "Status",
      },
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
      <PageTopHeader title="Order List" />
      <div className="card border shadow-lg">
        <div className="card-header d-flex justify-content-between ">
          <div>Order List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Item Order");
              }}
            >
              <FiPlusCircle size={16} /> Make New Order
            </button>
          </div>
        </div>

        <div className="card-body p-0 ">
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
                    <BsFillEyeFill color="black" size={18} /> Details
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
                        <FaTrash size={13} className="me-1" /> Delete



                      </button>

                      <Link
                        to={`/dashboard/receved-order-list/${row?.row?.original?.id}`}
                        className="px-2 d-flex align-items-center btn btn-info btn-sm"
                      ><PiKeyReturnFill size={18} />
                      Received
                       
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

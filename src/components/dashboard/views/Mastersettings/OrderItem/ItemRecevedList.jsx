import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from "../../../common/PageTopHeader";
import MaterialReactTable from "material-react-table";
import AuthorModal from "./OrderItemModal";

import { toast } from "react-toastify";
import Loader from "../../../common/Loader";


import {
  useAllItemRecevedListQuery,
  useDeleteItemOrderMutation,
} from "../../../../../services/itemOrder";

import moment from "moment";
import { TbCurrencyTaka } from "react-icons/tb";

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



  const columns = useMemo(
    () => [


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
        accessorFn: (row) =>
          row?.payable_amount && (
            <><TbCurrencyTaka />{row.payable_amount}</>
          ),

        id: "payable_amount",
        header: "Payable Amount",
        size: 10,
      },
      {
        accessorFn: (row) =>
          row?.paid_amount && (
            <><TbCurrencyTaka />{row.paid_amount}</>
          ),

        id: "paid_amount",
        header: "Paid Amount",
        size: 10,
      },
      {
        accessorFn: (row) =>
          row?.due_amount && (
            <><TbCurrencyTaka />{row.due_amount}</>
          ),

        id: "due_amount",
        header: "Due Amount",
        size: 10,
      },





      {
        accessorFn: (row) =>
          row?.received_date && (
            <>{moment(row.received_date).format("MMMM Do YYYY")}</>
          ),

        id: "received_date",
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
                        handelClickValue("Received Information");
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

import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from "../../../common/PageTopHeader";
import MaterialReactTable from "material-react-table";
import AuthorModal from "./VendorePaymentModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { confirmHandel } from "../../../../../utils/Alert";
import avatar from "../../../../../assets/images/profile-picture.png";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";

import {
  useDeleteBookItemMutation,
  useGetBookItemListQuery,
} from "../../../../../services/bookItemApi";
import { useGetVendorPaymentListQuery } from "../../../../../services/vendorApi";

const VendorePaymentList = () => {
  const res = useGetVendorPaymentListQuery();

  const [deleteBookItem] = useDeleteBookItemMutation();
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
        accessorKey: "vendor_payment_no", //access nested data with dot notation
        header: "Vendor Payment No",
        size: 10,
      },

      {
        accessorKey: "vendor_name", //normal accessorKey
        header: "Vendor Name",
        size: 10,
      },
      {
        accessorKey: "invoice_no", //normal accessorKey
        header: "Invoice No",
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
        accessorKey: "comments", //normal accessorKey
        header: "Comments",
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

        id: "Publish Status",
        header: "Publish Status",
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
      <PageTopHeader title="Vendor Payment" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div>Vendor Payment List</div>

        </div>

        <div class="card-body p-0">
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
                  <div className="mr-1">
                    {/* <Link
                  to="#"
                    className="btn btn-info btn-sm d-flex align-items-center"
                  onClick={() => {
                    handleShow();
                    handelClickValue("Branch Information");
                    setParamId(row?.row?.original);
                  
                  }}
                >
                  <div className="mr-1"><BsFillEyeFill color="black" size={18} /></div>
                  <div>Details</div>
                  
                  
                </Link> */}
                  </div>
                  {row?.row?.original?.payment_status !== "paid" ? (
                    <div className="mx-2">
                    <button
                      title=""
                      className="px-2 d-flex align-items-center btn btn-primary btn-sm"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Vendor Payment");
                        setParamId(row?.row?.original);
                      }}
                    >
                      <div>
                        <FaEdit size={16} />
                      </div>
                      <div> Pay</div>
                    </button>
                  </div>
                  ) : (
                    <span className="badge bg-success">Payment <br/>Completed</span>
                
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

export default VendorePaymentList;

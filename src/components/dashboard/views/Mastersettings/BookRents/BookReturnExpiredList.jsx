import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from "../../../common/PageTopHeader";
import MaterialReactTable from "material-react-table";
import AuthorModal from "./BookRentsModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { confirmHandel } from "../../../../../utils/Alert";
import avatar from "../../../../../assets/images/profile-picture.png";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";
import { IoReceipt } from "react-icons/io5";

import { Link } from "react-router-dom";
import {
  useBookRentActiveMutation,
  useDeleteRentsMutation,
} from "../../../../../services/itemRentApi";
import { useGetDateExpiredListQuery } from "../../../../../services/bookItemApi";
import moment from "moment";

const BookReturnExpiredList = () => {
  const res = useGetDateExpiredListQuery();
  const { data, isSuccess, isFetching, isError, error } = res;
  const [deleteRents] = useDeleteRentsMutation();
  const [bookRentActive] = useBookRentActiveMutation();
  const [clickValue, setClickValue] = useState(null);
  const [paramId, setParamId] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const handelDelete = async (id) => {
    const result = await deleteRents(id).unwrap();
    toast.success(result.message);
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) =>
          row?.item_photo ? (
            <>
              <img
                className="img-fluid rounded-circle shadow"
                style={{ width: "40px", height: "40px" }}
                src={`${import.meta.env.VITE_FILE_URL}${row?.item_photo}`}
                alt=""
              ></img>
              {row.item_name}
            </>
          ) : (
              <>
            
            <img
              className="img-fluid rounded-circle shadow"
              style={{ width: "40px", height: "40px" }}
              src={avatar}
              alt=""
                ></img>
                  {row.item_name}
              </>
          ), 

        id: "Book",
        header: "Book ",
        size: 10,
      },

      {
        accessorFn: (row) =>
          row?.user_photo ? (
            <>
              <img
                className="img-fluid rounded-circle shadow"
                style={{ width: "40px", height: "40px" }}
                src={`${import.meta.env.VITE_FILE_URL}${row?.user_photo}`}
                alt=""
              ></img>
              {row.user_name}
            </>
          ) : (
              <>
            <img
              className="img-fluid rounded-circle shadow"
              style={{ width: "40px", height: "40px" }}
              src={avatar}
              alt=""
                ></img>
                {row.user_name}
              </>
          ),

        id: "user_photo",
        header: "Borrower ",
        size: 10,
      },
      {
        accessorKey: "isbn", //normal accessorKey
        header: "ISBN",
        size: 10,
      },


      {
        accessorKey: "rental_no", //access nested data with dot notation
        header: "Rental No",
        size: 10,
      },

      // {
      //   accessorKey: "rental_date", //normal accessorKey
      //   header: "Rental Date",
      //   size: 10,
      // },

      {
        accessorFn: (row) =>
          row?.return_date && (
            <>
              {moment(row.return_date).format("MMMM Do YYYY")} <br />
              {row?.rental_status === "active" ? (
                <span className=" bg-danger text-white p-1 rounded-2">
                  Not Return
                </span>
              ) : (
                <span className=" bg-info text-white p-1 rounded-2">
                   Admin Not Active
                </span>
              )}
            </>
          ),

        id: "return_date",
        header: "Return Date",
        size: 10,
      },

      {
        //accessorFn function that combines multiple data together
        accessorFn: (row) =>
          row?.rental_status === "active" ? (
            <>
              <span className="badge bg-info">Active</span>
            </>
          ) : (
            <span className="badge bg-danger">Inactive</span>
          ),

        id: "order Status",
        header: "Order Status",
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
      <PageTopHeader title="Expired List" />
      <div class="card border shadow-lg">
        <div class="card-header d-flex justify-content-between ">
          <div>Expired List</div>
        </div>

        <div class="card-body p-0 ">
          <MaterialReactTable
            columns={columns}
            data={isSuccess && data}
            // enableRowActions
            // enableColumnActions
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
                    <Link
                      to="#"
                      className="btn btn-secondary btn-sm d-flex align-items-center"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Book Issue Information");
                        setParamId(row?.row?.original);
                      }}
                    >
                      {/* <div className="mr-1"><BsFillEyeFill color="black" size={18} /></div> */}
                      <div>Details</div>
                    </Link>
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

export default BookReturnExpiredList;

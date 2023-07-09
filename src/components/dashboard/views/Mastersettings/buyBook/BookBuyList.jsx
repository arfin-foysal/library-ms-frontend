import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from "../../../common/PageTopHeader";
import MaterialReactTable from "material-react-table";
import BookRentsModal from "../BookRents/BookRentsModal";
import { confirmHandel } from "../../../../../utils/Alert";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";


import { Link } from "react-router-dom";
import {
  useBookRentActiveMutation,
  useDeleteRentsMutation,
  useItemBuyListQuery,

} from "../../../../../services/itemRentApi";
import moment from "moment";
import { BsFillEyeFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const BookBuyList = () => {
  const res = useItemBuyListQuery();

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
        accessorKey: "rental_no", //access nested data with dot notation
        header: "Order No",
        size: 10,
      },
      {
        accessorKey: "user_name", //access nested data with dot notation
        header: "Name",
        size: 10,
      },

      {
        accessorKey: "qty", //normal accessorKey
        header: "Quantity ",
        size: 10,
      },

      {
        accessorFn: (row) =>
          row && (
            <>
              {moment(row.rental_date).format("MMMM Do YYYY")}
    
              
            </>
          ),

        id: "rental_date ",
        header: "Rental Date",
        size: 10,
      },


      {
        //accessorFn function that combines multiple data together
        accessorFn: (row) =>
          row?.status === "active" ? (
            <>
              <span className="badge bg-info">Active</span>
            </>
          ) : (
            <span className="badge bg-danger">Inactive</span>
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
      <BookRentsModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      <PageTopHeader title="Buy List" />
      <div class="card border shadow-lg">
        <div class="card-header d-flex justify-content-between ">
          <div>Buy List</div>

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
                  <div className="mr-1">
                    <Link
                      to="#"
                      className="btn btn-secondary btn-sm d-flex align-items-center"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Item Information");
                        setParamId(row?.row?.original);
                      }}
                    >
                    <div><BsFillEyeFill color="black" size={18} /> Details</div>
                    </Link>
                  </div>

                  {row?.row?.original?.status === "inactive" && (
                    <div className=" d-flex">
                      <div>
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
                          className="px-2 mx-2 d-flex align-items-center btn btn-danger btn-sm"
                        >
                          <FaTrash size={13} className="me-1" /> Delete
                        </button>
                      </div>

                      <div>
                        <button
                          onClick={() =>
                            confirmHandel(
                              "success",
                              "Active",
                              "#198754",
                              row?.row?.original?.id,
                              bookRentActive
                            )
                          }
                          className=" d-flex align-items-center btn btn-success btn-sm"
                        >
                     <IoCheckmarkDoneCircleSharp/> Active
                        </button>
                      </div>
                    </div>
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

export default BookBuyList;

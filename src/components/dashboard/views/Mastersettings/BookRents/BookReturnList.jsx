import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from "../../../common/PageTopHeader";
import MaterialReactTable from "material-react-table";
import AuthorModal from "./BookRentsModal"; 
import avatar from "../../../../../assets/images/profile-picture.png";

import Loader from "../../../common/Loader";


import { Link } from "react-router-dom";
import {
   useItemReturnListQuery,

} from "../../../../../services/itemRentApi";
import moment from "moment";


const BookReturnList = () => {
  const res = useItemReturnListQuery();
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
        accessorKey: "rental_no", //access nested data with dot notation
        header: "Rental No",
        size: 10,
      },
      {
        accessorKey: "return_no", //access nested data with dot notation
        header: "Return No",
        size: 10,
      },
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
            </>
          ) : (
            <img
              className="img-fluid rounded-circle shadow"
              style={{ width: "40px", height: "40px" }}
              src={avatar}
              alt=""
            ></img>
          ),

        id: "Book Photo",
        header: "Book Photo",
        size: 10,
      },
      {
        accessorKey: "item_name", //access nested data with dot notation
        header: "Book name",
        size: 10,
      },
      {
        accessorKey: "isbn", //normal accessorKey
        header: "ISBN",
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
            </>
          ) : (
            <img
              className="img-fluid rounded-circle shadow"
              style={{ width: "40px", height: "40px" }}
              src={avatar}
              alt=""
            ></img>
          ),

        id: "user_photo",
        header: "Borrower Photo",
        size: 10,
      },
   
      {
        accessorKey: "user_name", //access nested data with dot notation
        header: "Borrower name",
        size: 10,
      },

    
      {
        accessorKey: "item_amount_of_penalty", //access nested data with dot notation
        header: "Penalty Amount",
        size: 10,
      },

      {
        accessorFn: (row) =>
          row?.rental_date && (
            <>
              {moment(row.rental_date).format("MMMM Do YYYY")}
            </>
          ) ,

        id: "rental_date",
        header: "Rental Date",
        size: 10,
      },
      {
        accessorFn: (row) =>
          row?.rental_date && (
            <>
              {moment(row.return_date).format("MMMM Do YYYY")}
            </>
          ) ,

        id: "return_date",
        header: "Return Date",
        size: 10,
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
      <PageTopHeader title="Book Return List" />
      <div class="card border shadow-lg">
        <div class="card-header d-flex justify-content-between ">
          <div>Book Return List</div>
          {/* <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Book Issue");
              }}
            >
              Add New Book Issue
            </button>
          </div> */}
        </div>

        <div class="card-body p-0 ">
          <MaterialReactTable
            columns={columns}
            data={isSuccess &&  data?.data}
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

export default BookReturnList;

import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from "../../../common/PageTopHeader";
import MaterialReactTable from "material-react-table";
import BookItemModal from "./BookItemModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { confirmHandel } from '../../../../../utils/Alert';
import avatar from "../../../../../assets/images/profile-picture.png";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";

import { FiPlusCircle } from "react-icons/fi";

import { useDeleteBookItemMutation, useGetBookItemListQuery } from "../../../../../services/bookItemApi";

const BookItemList = () => {
  const res = useGetBookItemListQuery();
  
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

  const handelDelete = async (id) => {
    const result = await deleteBookItem(id).unwrap();
    toast.success(result.message);
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) =>
          row?.photo ? (
            <>
              <img
                className="img-fluid rounded-circle shadow"
                style={{ width: "40px", height: "40px" }}
                src={`${import.meta.env.VITE_FILE_URL}${row?.photo}`}
                alt=""

              ></img>
              <br />

            </>
          ) : (
            <>
              <img
                className="img-fluid rounded-circle shadow"
                style={{ width: "40px", height: "40px" }}
                src={avatar}
                alt=""
              ></img>

            </>
          ),

        id: "Photo",
        header: "Photo",



      },


      {
        accessorKey: "title", //access nested data with dot notation
        header: "Name",
        size: 10,
      },
      {
        accessorKey: "barcode_or_rfid", //access nested data with dot notation
        header: "Barcode Or Rfid",
        size: 10,
      },

      {
        accessorKey: "isbn", //normal accessorKey
        header: "Isbn",
        size: 10,
      },
      {
        accessorKey: "item_type", //normal accessorKey
        header: "Item Type",
        size: 10,
      },


      {
        accessorKey: "edition", //normal accessorKey
        header: "Edition",
        size: 10,
      },

      {
        //accessorFn function that combines multiple data together
        accessorFn: (row) =>
          row?.is_active === true ? (
            <>
              <span className="badge bg-info">Active</span>
            </>
          ) : (
            <span className="badge bg-danger">Inactive</span>
          ),

        id: "Status",
        header: "Status",
      },
    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}
      <BookItemModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      <PageTopHeader title="Item List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Item List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Item");
              }}
            >
              <FiPlusCircle size={16}
              />  Add New Item
            </button>
          </div>
        </div>

        <div className="card-body p-0">
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

              

                  <div className="mx-2">
                    <button
                      title=""
                      className="px-2 d-flex align-items-center btn btn-primary btn-sm"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Edit Item");
                        setParamId(row?.row?.original);
                      }}
                    >

                      <FaEdit size={16} className="me-1" /> Edit


                    </button>
                  </div>
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
                      className="px-2 d-flex align-items-center btn btn-danger btn-sm"
                    >
                      <FaTrash size={13} className="me-1" /> Delete


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

export default BookItemList;

import React, { useCallback, useMemo, useState } from "react";

import MaterialReactTable from "material-react-table";

import { FaEdit, FaTrash } from "react-icons/fa";
import { confirmHandel } from "../../../../../utils/Alert";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";  
import PageTopHeader from "../../../common/PageTopHeader";

import { useDeleteLanguageMutation, useGetLanguageListQuery } from "../../../../../services/commonApi";
import LanguageModal from "./LanguageModal";

const LanguageList = () => {
  const res = useGetLanguageListQuery();

  const [deleteLanguage] = useDeleteLanguageMutation();
  
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
    const result = await deleteLanguage(id).unwrap();
    toast.success(result.message);
  };

  const columns = useMemo(
    () => [
   

      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
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
      <LanguageModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      <PageTopHeader title="Language List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Language List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Language");
              }}
            >
              Add New Language
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
                  <div className="mr-1">
                  </div>

                  <div className="mx-2">
                    <button
                      title=""
                      className="px-2 d-flex align-items-center btn btn-primary btn-sm"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Edit Language");
                        setParamId(row?.row?.original);
                      }}
                    >
                      <div>
                        <FaEdit size={16} />
                      </div>
                      <div> Edit</div>
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
                      <div> Delete</div>
                      <div>
                        <FaTrash size={13} />
                      </div>
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

export default LanguageList;

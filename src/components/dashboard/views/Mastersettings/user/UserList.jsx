import React, { useCallback, useMemo, useState } from "react";

import MaterialReactTable from "material-react-table";

import { FaEdit, FaTrash } from "react-icons/fa";
import { FcUnlock } from "react-icons/fc";
import { confirmHandel } from "../../../../../utils/Alert";
import avatar from "../../../../../assets/images/profile-picture.png";
import { toast } from "react-toastify";
import Loader from "../../../common/Loader";

import PageTopHeader from "../../../common/PageTopHeader";

import CategoryModal from "./UserModal";
import {
  useDeleteUserMutation,
  useGetUserListQuery,
} from "../../../../../services/userApi";
import PasswordUpdateModal from "./PasswordUpdateModal";
import { FiPlusCircle } from "react-icons/fi";

const UserList = () => {
  const res = useGetUserListQuery();

  const [deleteUser] = useDeleteUserMutation();

  const { data, isSuccess, isFetching, isError, error } = res;
  const [clickValue, setClickValue] = useState(null);
  const [paramId, setParamId] = useState(null);
  const [show, setShow] = useState(false);
  const [showP, setShowP] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseP = () => setShowP(false);
  const handleShowP = () => setShowP(true);

  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);
  const handelDelete = async (id) => {
    const result = await deleteUser(id).unwrap();
    toast.success(result.message);
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) =>
          row?.profile_photo_path ? (
            <>
              <img
                className="img-fluid rounded-circle shadow"
                style={{ width: "40px", height: "40px" }}
                src={`${import.meta.env.VITE_FILE_URL}${
                  row?.profile_photo_path
                }`}
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

        id: "profile_photo_path",
        header: "Photo",
        size: 10,
      },

      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 10,
      },

      {
        accessorKey: "email", //normal accessorKey
        header: "Email",
        size: 10,
      },
      {
        accessorKey: "phone", //normal accessorKey
        header: "Phone",
        size: 10,
      },
      {
        accessorKey: "user_role", //normal accessorKey
        header: "User Role",
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
      <CategoryModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramId={paramId}
      />
      <PasswordUpdateModal
        show={showP}
        handleClose={handleCloseP}
        paramId={paramId}


      />
      <PageTopHeader title="User List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div> User List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New User");
              }}
            >
              <FiPlusCircle size={16} /> Add New User
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

                  <div>
                    <button
                      title=""
                      className="px-2 d-flex align-items-center btn btn-primary btn-sm"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Edit User");
                        setParamId(row?.row?.original);
                      }}
                    >
                      <div>
                        <FaEdit size={16} />
                      </div>
                      <div> Edit</div>
                    </button>
                  </div>
                  <div className="mx-2">
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
                     <FaTrash size={13} /> Delete
                    
                        
                     
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handleShowP();
                        setParamId(row?.row?.original?.id);
                      }}
                      className="px-2 d-flex align-items-center btn btn-warning btn-sm"
                    >
                  <FcUnlock />  Reset
                    
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

export default UserList;

import React, { useMemo } from "react";
import PageTopHeader from "../../common/PageTopHeader";
import { useGetAuthorListQuery } from "../../../../services/authorApi";
import MaterialReactTable from "material-react-table";
const AuthorList = () => {
  const res = useGetAuthorListQuery();
  const { data, isSuccess, isFetching, isError, error } = res;
  console.log(data);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
      },

      {
        accessorKey: "email", //normal accessorKey
        header: "Email",
      },
      {
        accessorKey: "mobile", //normal accessorKey
        header: "Mobile",
        size: 10,
      },
      //   {
      //     accessorFn: (row) =>
      //       row.is_active === true ? (
      //         <>
      //           <span className="badge badge-success">Active</span>
      //         </>
      //       ) : (
      //         <>
      //           <span className="badge badge-danger">Inactive</span>
      //         </>
      //       ), //alternate way
      //     size: 10, //optional
      //     id: "is_active", //id required if you use accessorFn instead of accessorKey
      //     header: "Status",
      //     Header: <span className="table-header">Status</span>, //optional custom markup
      //   },
    ],
    []
  );
  return (
    <>
      <PageTopHeader title="Author" />
      <div class="card border shadow-lg ">
        <div class="card-header d-flex justify-content-between ">
          <div> Author List</div>
          <div>
            <button className="btn btn-primary btn-sm">Add New Author</button>
          </div>
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
                  {/* <div>
                <Link
                  to={`#`}
                  title=""
                  className="px-2 d-flex align-items-center btn btn-primary btn-sm"
                  onClick={() => {
                    handleShow();
                    handelClickValue("Edit Branch");
                    setParamId(row?.row?.original);
                  }}
                >
                  <div>   <FaEdit size={16} /></div>
                  <div> Edit</div>
               
                </Link>
              </div> */}
                </div>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default AuthorList;

import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import Loader from "../../common/Loader";
import { Link } from 'react-router-dom';




const OrderItemTable = ({ orderItem,
  isFetching,
  isSuccess,
  isError,
}) => {
  const columns = useMemo(
    () => [
      // {

      //   accessorFn: (row) =>
      //     row?.order_status === "received" ? (
      //       <>
      //         <span className="badge bg-info">received</span>
      //       </>
      //     ) : (
      //       <span className="badge bg-danger">unreceived</span>
      //     ),

      //   id: "order_status",
      //   header: "Status",
      // },



      {
        accessorKey: "order_no", //access nested data with dot notation
        header: "Order No",
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
        accessorKey: "amount", //normal accessorKey
        header: "Amount",
        size: 10,
      },
      {
        accessorKey: "discount", //normal accessorKey
        header: "Discount",
        size: 10,
      },
      {
        accessorKey: "total", //normal accessorKey
        header: "Total",
        size: 0,
      },


      {
        //accessorFn function that combines multiple data together
        accessorFn: (row) =>
          row?.order_status === "received" ? (
            <>
              <span className="badge bg-info">received</span>
            </>
          ) : (
            <span className="badge bg-danger">unreceived</span>
          ),

        id: "order_status",
        header: "Status",
      },

    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}


 
          <MaterialReactTable
            columns={columns}
            data={isSuccess && orderItem}
            // enableBottomToolbar={false}


            muiTopToolbarProps={{
              style: {
                backgroundColor: "#3f4d67",
              },
            }}
        // enablePagination="true"
        muiTablePaginationProps={{
          style: {
            backgroundColor: "#3f4d67",
            display: "none"
          },
        }
        }





        renderBottomToolbarCustomActions={() => {

          return (
            <div className="text-center">
              <Link to="/dashboard/order-list" className="btn  btn-sm" style={{
                backgroundColor: "#3f4d67",
                color: "white"
              }} >
                View More
              </Link>
            </div>

          )

        }} 

          />
      
    </>
  );
};

export default OrderItemTable;

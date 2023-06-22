import React, {  useMemo } from "react";
import MaterialReactTable from "material-react-table";
import OrderItemModal from "../Mastersettings/OrderItem/OrderItemModal";
import Loader from "../../common/Loader";
import moment from "moment";
import { Link } from 'react-router-dom';
const ItemReceivedTable = ({
  receiveItem,
  isFetching,
  isSuccess,
  isError,
}) => {









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
        accessorFn: (row) =>
          row?.received_date && (
            <>
              {moment(row.received_date).format("MMMM Do YYYY")}
            </>
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

    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}


    
          <MaterialReactTable
            columns={columns}
            // enableBottomToolbar={false}
            data={isSuccess && receiveItem}

            positionActionsColumn="last"
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
                  <Link to="/dashboard/item-received-list" className="btn  btn-sm" style={{
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

export default ItemReceivedTable;

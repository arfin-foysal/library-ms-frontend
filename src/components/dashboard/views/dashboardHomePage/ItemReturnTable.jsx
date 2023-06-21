import React, { useMemo } from "react";
import MaterialReactTable from 'material-react-table';
import moment from "moment";


const ItemReturnTable = ({ returnItem,
  isFetching,
  isSuccess,
  isError


}) => {






  const columns = useMemo(
    () => [

      {
        accessorKey: "return_no", //access nested data with dot notation
        header: "Return No",
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
        accessorKey: "item_amount_of_penalty", //access nested data with dot notation
        header: "Penalty Amount",
        size: 10,
      },

      {
        accessorFn: (row) =>
          row?.rental_date && (
            <>
              {moment(row.return_date).format("MMMM Do YYYY")}
            </>
          ),

        id: "return_date",
        header: "Return Date",
        size: 10,
      },



    ],
    []
  );

  return (
    <>


      <div class="card-body p-0 ">
        <MaterialReactTable
          columns={columns}
          data={isSuccess && returnItem}
          enableBottomToolbar={false}
          // enableRowActions
          // enableColumnActions
          positionActionsColumn="last"
          muiTopToolbarProps={{
            style: {
              backgroundColor: "#3f4d67",
            },
          }}
        // enablePagination="true"

        />
      </div>
    </>
  );
};

export default ItemReturnTable;

import { useMemo } from "react";


import moment from "moment";
import Loader from "../../common/Loader";

import MaterialReactTable from "material-react-table";

const ItemRentTable = ({ rent,
    isFetching,
    isSuccess,
    isError,

}) => {






    const columns = useMemo(
        () => [

            {
                accessorKey: "rental_no", //access nested data with dot notation
                header: "Rental No",
                size: 10,
            },

            {
                accessorKey: "qty", //normal accessorKey
                header: "Qty",
                size: 10,
            },

            {
                accessorFn: (row) =>
                    row?.rental_date && (
                        <>{moment(row.rental_date).format("MMMM Do YYYY")}</>
                    ),

                id: "rental_date",
                header: "Rental Date",
                size: 10,
            },
            {
                accessorFn: (row) =>
                    row?.rental_date && (
                        <>{moment(row.rental_date).format("MMMM Do YYYY")}</>
                    ),

                id: "return_date",
                header: "Return Date",
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
                header: "Order Status",
            },

        ],
        []
    );

    return (
        <>
            {isFetching && <Loader />}


            <div >
                <MaterialReactTable
                    columns={columns}
                    data={isSuccess && rent}
                    enableBottomToolbar={false}
                    positionActionsColumn="last"
                    muiTopToolbarProps={{
                        style: {
                            backgroundColor: "#3f4d67",
                        },
                    }}

                />
            </div>
        </>
    );
};





export default ItemRentTable
import { useMemo } from "react";


import moment from "moment";
import Loader from "../../common/Loader";

import MaterialReactTable from "material-react-table";
import { Link } from "react-router-dom";

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


            < >

                <MaterialReactTable
                    columns={columns}
                    data={isSuccess && rent}
                    // enableBottomToolbar={false}
                    // positionActionsColumn="last"
                    muiTopToolbarProps={{
                        style: {
                            backgroundColor: "#3f4d67",
                        },
                    }}

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
                                <Link to="/dashboard/rent-list" className="btn  btn-sm" style={{
                                    backgroundColor: "#3f4d67",
                                    color: "white"
                                }} >
                                    View More
                                </Link>
                            </div>

                        )

                    }


                    }

                />
            </>
        </>
    );
};





export default ItemRentTable
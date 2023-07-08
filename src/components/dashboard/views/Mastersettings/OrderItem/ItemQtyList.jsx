import React, {  useMemo } from "react";
import PageTopHeader from "../../../common/PageTopHeader";
import MaterialReactTable from "material-react-table";

import avatar from "../../../../../assets/images/profile-picture.png";

import Loader from "../../../common/Loader";


import {

} from "../../../../../services/itemOrder";
import { useItemAndAvailableQtyQuery } from "../../../../../services/itemRentApi";

const ItemQtyList = () => {
  const res = useItemAndAvailableQtyQuery();





  const { data, isSuccess, isFetching} = res;




  const columns = useMemo(
    () => [
      {
        accessorKey: "title", //access nested data with dot notation
        header: "Title",
        size: 10,
      },
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

        id: "Book",
        header: "Book ",
        size: 10,
      },

      {
        accessorKey: "isbn", //access nested data with dot notation
        header: "ISBN",
        size: 10,
      },

      {
        accessorKey: "edition", //access nested data with dot notation
        header: "Edition",
        size: 10,
      },
      {
        accessorKey: "language_name", //access nested data with dot notation
        header: "Language Name",
        size: 10,
      },


      
        {
          accessorFn: (row) =>
            row?.qty ? (
              <>
                <span className="text-success fw-bold">{row?.qty}</span>
              </>

            ) : (
                <span className="Text-info fw-bold">0</span>

            ),
          id: "Available Qty",
          header: "Quantity",
          size: 10,

      },


    
   

    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}

      <PageTopHeader title="Stock List" />
      <div className="card border shadow-lg">
        <div className="card-header d-flex justify-content-between ">
          <div>Stock List</div>
          <div>

          </div>
        </div>

        <div className="card-body p-0 ">
          <MaterialReactTable
            columns={columns}
            data={isSuccess && data?.data}
            // enableRowActions
            enableColumnActions
            positionActionsColumn="last"
            muiTopToolbarProps={{
              style: {
                backgroundColor: "#3f4d67",
              },
            }}
            // enablePagination="true"
    
          />
        </div>
      </div>
    </>
  );
};

export default ItemQtyList;

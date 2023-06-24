import React, { useCallback, useMemo, useState } from "react";
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
            <img
              className="img-fluid rounded-circle shadow"
              style={{ width: "40px", height: "40px" }}
              src={avatar}
              alt=""
            ></img>
          ),

        id: "Photo",
        header: "Photo",
        size: 10,
      },

      {
        accessorKey: "isbn", //access nested data with dot notation
        header: "Isbn",
        size: 10,
      },
      {
        accessorKey: "title", //access nested data with dot notation
        header: "Name",
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
        accessorKey: "country_name", //access nested data with dot notation
        header: "Country Name",
        size: 10,
      },

      {
        accessorKey: "qty", //normal accessorKey
        header: "Qty",
        size: 10,
      },
      
    
   
      // {
      //   //accessorFn function that combines multiple data together
      //   accessorFn: (row) =>
      //     row?.is_active === true ? (
      //       <>
      //         <span className="badge bg-info">Active</span>
      //       </>
      //     ) : (
      //       <span className="badge bg-danger">Inactive</span>
      //     ),

      //   id: "Status",
      //   header: "Status",
      // },
    ],
    []
  );

  return (
    <>
      {isFetching && <Loader />}

      <PageTopHeader title="Item Quantity List" />
      <div className="card border shadow-lg">
        <div className="card-header d-flex justify-content-between ">
          <div>Item Quantity List</div>
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

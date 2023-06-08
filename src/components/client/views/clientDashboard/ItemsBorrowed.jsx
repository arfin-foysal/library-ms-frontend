import React from "react";
import { useBoweredBookByUserQuery } from "../../../../services/ClientApi";
import BoweredBook from "../common/BoweredBook";
import Loader from "../../../dashboard/common/Loader";

const ItemsBorrowed = () => {
  const boweredRes = useBoweredBookByUserQuery();

  return (
    <div>
      <h4>Items Borrowed</h4>

      {boweredRes?.isFetching && <Loader />}

      <div className="d-flex flex-wrap justify-content-between">
        {boweredRes?.data?.data?.map((book) => (
          <div className="my-2">
            <BoweredBook book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsBorrowed;

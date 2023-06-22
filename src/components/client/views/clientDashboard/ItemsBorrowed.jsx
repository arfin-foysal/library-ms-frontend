import React from "react";

import BoweredBook from "../common/BoweredBook";
import Loader from "../../../dashboard/common/Loader";
import { useBoweredBookByUserQuery } from "../../../../services/clientSiteApi";

const ItemsBorrowed = () => {
  const boweredRes = useBoweredBookByUserQuery();

  return (
    <div>
      <h4>Items Borrowed</h4>

      {boweredRes?.isFetching && <Loader />}

      <div className="d-flex flex-wrap justify-content-start ">
        {boweredRes?.data?.data?.map((book) => (
          <div className="m-2">
            <BoweredBook book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsBorrowed;

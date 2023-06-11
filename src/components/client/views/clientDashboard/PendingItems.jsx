import React from "react";
import { usePendingBoweredListQuery } from "../../../../services/ClientApi";
import BoweredBook from "../common/BoweredBook";
import Loader from "../../../dashboard/common/Loader";

const PendingItems = () => {
  const pendingRes = usePendingBoweredListQuery();

  return (
    <div>
      <h4>Pending Items</h4>

      {pendingRes?.isFetching && <Loader />}

      <div className="d-flex flex-wrap justify-content-between">
        {pendingRes?.data?.data?.map((book) => (
          <div className="my-2">
            <BoweredBook book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingItems;

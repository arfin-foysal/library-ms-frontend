import React from "react";
import Loader from "../../../dashboard/common/Loader";


import OverDueBook from "../common/OverDueBook";
import { useItemReturnTimeExpiredQuery } from "../../../../services/clientSiteApi";

const OverDueItems = () => {
  // itemReturnTimeExpired
  const pendingRes = useItemReturnTimeExpiredQuery();

  return (
    <div>
      <h4>Over Due Items</h4>

      {pendingRes?.isFetching && <Loader />}

      <div className="d-flex flex-wrap justify-content-between">
        {pendingRes?.data?.data?.map((book) => (
          <div className="my-2">
            <OverDueBook book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverDueItems;

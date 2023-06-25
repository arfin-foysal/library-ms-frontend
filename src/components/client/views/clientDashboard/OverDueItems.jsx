import React from "react";
import Loader from "../../../dashboard/common/Loader";


import OverDueBook from "../common/OverDueBook";
import { useItemReturnTimeExpiredQuery } from "../../../../services/clientSiteApi";
import ClientPageHeader from "../common/ClientPageHeader";

const OverDueItems = () => {
  // itemReturnTimeExpired
  const pendingRes = useItemReturnTimeExpiredQuery();

  return (
    <div>
      <ClientPageHeader title="Over Due Items" />
      <h4>Over Due Items</h4>

      {pendingRes?.isFetching && <Loader />}

      <div className="d-flex flex-wrap justify-content-star">
        {pendingRes?.data?.data?.map((book) => (
          <div className="m-2">
            <OverDueBook book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverDueItems;

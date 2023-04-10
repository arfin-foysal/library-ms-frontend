import React from "react";
import TopBox from "./TopBox";
import { BsStack } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { FcApproval } from "react-icons/fc";
import { ImCross } from "react-icons/im";

const AdminPage = () => {
  return (
    <>
          <div className="row">
          <TopBox
            name="Total Applications"
            color="blue"
            icon={<BsStack color="blue" size={25} />}
            // item={data?.data?.count_total}
              />
          <TopBox
            name="Total Applications"
            color="red"
            icon={<ImCross color="red" size={25} />}
            // item={data?.data?.count_total}
              />
          <TopBox
            name="Total Applications"
            color="#FFCC00"
            icon={<GiSandsOfTime color="#FFCC00" size={25} />}
            // item={data?.data?.count_total}
              />
          <TopBox
            name="Total Applications"
            color="green"
            icon={<FcApproval color="green" size={25} />}
            // item={data?.data?.count_total}
              />
              
      

  
      </div>
    </>
  );
};

export default AdminPage;

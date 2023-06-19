import React from "react";
import TopBox from "./TopBox";
import { BsBook, BsReverseListColumnsReverse, BsStack } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { FcApproval } from "react-icons/fc";


import { useDashboardSummeryQuery } from "../../../../services/commonApi";
import ItemRentTable from './ItemRentTable';


const AdminPage = () => {
  const dashboardRes = useDashboardSummeryQuery();
  const { data,
    isSuccess,
    isError,
    isFetching


  } = dashboardRes;

  console.log(data?.data?.itemRentList);

  return (
    <>
      <div className="row">
        <TopBox
          name="Total item"
          color="blue"
          icon={<BsBook color="blue" size={25} />}
          item={data?.data?.itemCount}
        />
        <TopBox
          name="Total Rents"
          color="red"
          icon={<BsReverseListColumnsReverse color="red" size={25} />}
        // item={data?.data?.count_total}
        />
        <TopBox
          name="Total Applications"
          color="#FFCC00"
          icon={<GiSandsOfTime color="#FFCC00" size={25} />}
        // item={data?.data?.count_total}
        />
        <TopBox
          name="Total Damage"
          color="green"
          icon={<FcApproval color="green" size={25} />}
        // item={data?.data?.count_total}
        />
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Rents List</div>
            <div className="card-body table-responsive">
              <ItemRentTable rent={data?.data?.itemRentList}
              isFetching={isFetching}
              isSuccess={isSuccess}
              isError={isError}
               />
            </div>
          </div>

        </div>
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Return List</div>
            <div className="card-body table-responsive">
              {/* <SummeryTable/> */}
            </div>
          </div>

        </div>
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Order List</div>
            <div className="card-body table-responsive">
              {/* <SummeryTable/> */}
            </div>
          </div>

        </div>
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Receive List</div>
            <div className="card-body table-responsive">
              {/* <SummeryTable/> */}
            </div>
          </div>

        </div>
      </div>


    </>
  );
};

export default AdminPage;

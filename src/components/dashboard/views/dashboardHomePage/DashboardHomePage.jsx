import React from "react";
import TopBox from "./TopBox";
import { BsBook, BsReverseListColumnsReverse, BsStack } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { FcApproval } from "react-icons/fc";


import { useDashboardSummeryQuery } from "../../../../services/commonApi";
import ItemRentTable from './ItemRentTable';
import ItemReturnTable from "./ItemReturnTable";
import OrderItemTable from "./OrderItemTable";
import ItemReceivedTable from "./ItemReceivedTable";
import VendorPaymentGraph from "./VendorPaymentGraph";
import BorrowGraph from "./BorrowGraph";
import { BiDollar, BiMoney } from "react-icons/bi";



const AdminPage = () => {
  const dashboardRes = useDashboardSummeryQuery();
  const { data,
    isSuccess,
    isError,
    isFetching


  } = dashboardRes;



  return (
    <>
      <div className="row">
        <TopBox
          name="Total item"
          color="blue"
          icon={<BsBook color="blue" size={25} />}
          item={data?.data?.itemCount}
          des=""
        />
        <TopBox
          name="Total Borrow Book"
          color="red"
          icon={<BsReverseListColumnsReverse color="red" size={25} />}
          item={data?.data?.totalRentBook}
          des="In this month"
        />
        <TopBox
          name="Total Order Item"
          color="#FFCC00"
          icon={<GiSandsOfTime color="#FFCC00" size={25} />}
          item={data?.data?.totalOrderItem}
          des="In this month"
        />
        <TopBox
          name="Total Vendor Payment"
          color="green"
          icon={<BiMoney color="green" size={25} />}
          item={data?.data?.totalVendorPayment}
          des="In this month"
        />
      </div>

      <div className="row">
      <div className="col-md-6 my-2">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder text-center ">Total Vendor Payment</div>
            <div className="card-body  p-0">
              <VendorPaymentGraph
                vendorPaymentGraph={data?.data?.vendorPaymentGraph}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 my-2">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder text-center ">Total Borrow Book</div>
            <div className="card-body  p-0">
              <BorrowGraph
                itemRentGraph={data?.data?.rentalBookGraph}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 my-2">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Rents List</div>
            <div className="card-body table-responsive p-0 ">
              <ItemRentTable rent={data?.data?.itemRentList}
                isFetching={isFetching}
                isSuccess={isSuccess}
                isError={isError}
              />
            </div>
          </div>

        </div>
        <div className="col-md-6 my-2">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Return List</div>
            <div className="card-body table-responsive p-0">
              <ItemReturnTable returnItem={data?.data?.itemReturnList}
                isFetching={isFetching}
                isSuccess={isSuccess}
                isError={isError}
              />
            </div>
          </div>

        </div>
        <div className="col-md-6 my-2">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Order List</div>
            <div className="card-body table-responsive  p-0">
              <OrderItemTable
                orderItem={data?.data?.itemOrderList}
                isFetching={isFetching}
                isSuccess={isSuccess}
                isError={isError}
              />
            </div>
          </div>

        </div>
        <div className="col-md-6 my-2">
          <div className="card shadow border-0">
            <div className="card-header fw-bolder">Received List</div>
            <div className="card-body table-responsive p-0">
              <ItemReceivedTable
                receiveItem={data?.data?.orderReceivedList}
                isFetching={isFetching}
                isSuccess={isSuccess}
                isError={isError}

              />
            </div>
          </div>
        </div>
     
      </div>





    </>
  );
};

export default AdminPage;

import { Navigate } from "react-router-dom";
import { getPath } from "./utils";
import DashboardHomePage from "../components/dashboard/views/dashboardHomePage/DashboardHomePage";

import AuthorList from "./../components/dashboard/views/Mastersettings/author/AuthorList";
import CategoryList from "./../components/dashboard/views/Mastersettings/category/CategoryList";
import SubCategoryList from "./../components/dashboard/views/Mastersettings/subCategory/SubCategoryList";
import ThirdSubCategoryList from "../components/dashboard/views/Mastersettings/thirdSubCategory/ThirdSubCategoryList";
import LanguageList from "../components/dashboard/views/Mastersettings/language/LanguageList";
import CounteryList from "../components/dashboard/views/Mastersettings/country/CountryList";
import PublisherList from "../components/dashboard/views/Mastersettings/publisher/PublisherList";
import VendorList from "../components/dashboard/views/Mastersettings/vendor/VendorList";
import UserList from "../components/dashboard/views/Mastersettings/user/UserList";
import BookItemList from "../components/dashboard/views/Mastersettings/bookItem/BookItemList";
import MembershipList from "../components/dashboard/views/Mastersettings/membershipPlan/MembershipList";
import OrderItemList from "../components/dashboard/views/Mastersettings/OrderItem/OrderItemList";

import RecevedOrderItem from "../components/dashboard/views/Mastersettings/OrderItem/RecevedOrderItem";
import VendorePaymentList from "../components/dashboard/views/Mastersettings/vendorePayment/VendorePaymentList";
import BookRentsList from "../components/dashboard/views/Mastersettings/BookRents/BookRentsList";
import ItemQtyList from "../components/dashboard/views/Mastersettings/OrderItem/ItemQtyList";
import ItemRecevedList from "../components/dashboard/views/Mastersettings/OrderItem/ItemRecevedList";
import BookReturnExpiredList from "../components/dashboard/views/Mastersettings/BookRents/BookReturnExpiredList";
import BookDamageList from "../components/dashboard/views/Mastersettings/BookRents/BookDamageList";
import BookReturnList from "../components/dashboard/views/Mastersettings/BookRents/BookReturnList";


export const privateRoute = [
  {
    path: "*",
    element: <Navigate replace to={getPath()} />,
    role: "all",
  },
  {
    path: "/dashboard",
    element: <Navigate replace to={getPath()} />,
    role: "all",
  },

  {
    path: "admin",
    element: <DashboardHomePage />,
    role: "admin",
  },

  {
    path: "author-list",
    element: <AuthorList />,
    role: "admin",
  },
  {
    path: "category-list",
    element: <CategoryList />,
    role: "admin",
  },
  {
    path: "sub-category-list",
    element: <SubCategoryList />,
    role: "admin",
  },
  {
    path: "third-sub-category-list",
    element: <ThirdSubCategoryList />,
    role: "admin",
  },
  {
    path: "language-list",
    element: <LanguageList />,
    role: "admin",
  },
  {
    path: "country-list",
    element: <CounteryList />,
    role: "admin",
  },
  {
    path: "publisher-list",
    element: <PublisherList />,
    role: "admin",
  },
  {
    path: "vendor-list",
    element: <VendorList />,
    role: "admin",
  },
  {
    path: "user-list",
    element: <UserList />,
    role: "admin",
  },
    {
    path: "membership-plan-list",
    element: <MembershipList />,
    role: "admin",
  },
  {
    path: "item-list",
    element: <BookItemList />,
    role: "admin",
  },
  {
    path: "order-list",
    element: <OrderItemList />,
    role: "admin",
  },
  {
    path: "receved-order-list/:id",
    element: <RecevedOrderItem />,
    role: "admin",
  },
  {
    path: "item-receved-list",
    element: <ItemRecevedList />,
    role: "admin",
  },
  {
    path: "issue-list",
    element: <BookRentsList />,
    role: "admin",
  },
  {
    path: "return-date-expired-list",
    element: <BookReturnExpiredList />,
    role: "admin",
  },
  {
    path: "book-damage-list",
    element: <BookDamageList />,
    role: "admin",
  },
  {
    path: "return-list",
    element: <BookReturnList />,
    role: "admin",
  },
  {
    path: "vandor-payment",
    element: <VendorePaymentList />,
    role: "admin",
  },
  {
    path: "Item-qty-list",
    element: <ItemQtyList/>,
    role: "admin",
  },

];

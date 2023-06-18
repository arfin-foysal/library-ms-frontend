import Login from "../components/pages/login/Login";
import Signup from "../components/client/views/signup/ClientSignup";
import {
  authUser,
  authUserToken,
  clientAuthUser,
  clientAuthUserToken,
} from "../utils/Auth";
import { Navigate } from "react-router-dom";
import Layout from "../components/layout/clientLayout/Layout";
import Home from "../components/client/views/Home";
import AllBook from "../components/client/views/AllBook";
import BookDetails from "../components/client/views/BookDetails";
import AllAuthor from "../components/client/views/AllAuthor";
import AuthorDetails from "../components/client/views/AuthorDetails";
import ClientLogin from "../components/client/views/login/ClientLogin";
import ClientLayout from "../components/client/views/clientDashboard/ClientLayout";
import PersonalInfo from "../components/client/views/clientDashboard/PersonalInfo";
import ItemsBorrowed from "../components/client/views/clientDashboard/ItemsBorrowed";
import PendingItems from "../components/client/views/clientDashboard/PendingItems";
import OverDueItems from "../components/client/views/clientDashboard/OverDueItems";
import Contact from './../components/client/views/Contact';
import NotAccess from "../components/pages/commonViews/NotAccess";
import Error from "../components/pages/commonViews/Error";
import ClientSignup from "../components/client/views/signup/ClientSignup";


export const publicRoute = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allbook",
        element: <AllBook />,
      },
      {
        path: "/bookdetails/:id",
        element: <BookDetails />,
      },
      {
        path: "/authordetails/:id",
        element: <AuthorDetails />,
      },
      {
        path: "/author",
        element: <AllAuthor />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/client-dashboard",
        element:
          clientAuthUser === "" && clientAuthUserToken === "" ? (
            <Navigate to={"/login"} replace />
          ) : (
            <ClientLayout />
          ),
        children: [
          {
            path: "/client-dashboard/",
            element: <PersonalInfo />,
          },
          {
            path: "/client-dashboard/items-borrowed",
            element: <ItemsBorrowed />,
          },
          {
            path: "/client-dashboard/pending-items",
            element: <PendingItems />,
          },
          {
            path: "/client-dashboard/over-due-items",
            element: <OverDueItems />,
          }
          
        ]
      },
    ],
  },
  
  //client login

  {
    path: "/login",
    element:
      clientAuthUser !== "" && clientAuthUserToken !== "" ? (
        <Navigate to={"/"} replace />
      ) : (
        <ClientLogin />
      ),
  },

  
  {
    path: "/signup",
    element:
    clientAuthUser !== "" && clientAuthUserToken !== "" ? (
        <Navigate to={"/"} replace />
      ) : (
        <ClientSignup />
      ),
  },


  //dashboard login

  {
    path: "/dashboard-login",
    element:
      authUser !== "" && authUserToken !== "" ? (
        <Navigate to={"/dashboard"} replace />
      ) : (
        <Login />
      ),
  },
  // {
  //   path: "/dashboard-signup",
  //   element:
  //     authUser !== "" && authUserToken !== "" ? (
  //       <Navigate to={"/dashboard"} replace />
  //     ) : (
  //       <Signup />
  //     ),
  // },

  {
    path: "/not-access",
    element: <NotAccess />,
  },
  {
    path: "*",
    element: <Error />,
  },
];

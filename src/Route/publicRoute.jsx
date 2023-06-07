import Error from "../components/client/Error";

import NotAccess from "../components/client/NotAccess";
import Login from "../components/pages/login/Login";
import Signup from "../components/pages/signup/Signup";
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
        path: "/client-dashboard",
        element:
          clientAuthUser === "" && clientAuthUserToken === "" ? (
            <Navigate to={"/login"} replace />
          ) : (
            <ClientLayout />
          ),
        children: [
          
        ]
      },
    ],
  },

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
      authUser !== "" && authUserToken !== "" ? (
        <Navigate to={"/"} replace />
      ) : (
        <Signup />
      ),
  },
  {
    path: "/dashboard-login",
    element:
      authUser !== "" && authUserToken !== "" ? (
        <Navigate to={"/dashboard"} replace />
      ) : (
        <Login />
      ),
  },
  {
    path: "/dashboard-signup",
    element:
      authUser !== "" && authUserToken !== "" ? (
        <Navigate to={"/dashboard"} replace />
      ) : (
        <Signup />
      ),
  },

  {
    path: "/not-access",
    element: <NotAccess />,
  },
  {
    path: "*",
    element: <Error />,
  },
];

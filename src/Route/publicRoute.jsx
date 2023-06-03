import Error from "../components/client/Error";



import NotAccess from "../components/client/NotAccess";
import Login from "../components/pages/login/Login";
import Signup from "../components/pages/signup/Signup";
import { authUser, authUserToken } from "../utils/Auth";
import { Navigate } from "react-router-dom";
import Layout from "../components/layout/clientLayout/Layout";
import Home from "../components/client/views/Home";
import AllBook from "../components/client/views/AllBook";
import BookDetails from "../components/client/views/BookDetails";
import AllAuthor from "../components/client/views/AllAuthor";




export const publicRoute = [
  {
    path: "",
    element: <Layout/>,
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
        path: "/author",
        element: <AllAuthor />,
      },

    ],
  },
  {
    path: "/login",
    element:
      authUser !== "" && authUserToken !== "" ? <Navigate to={"/dashboard"} replace /> : <Login />,
  },
  {
    path: "/signup",
    element:
    authUser !== "" && authUserToken !== "" ? <Navigate to={"/dashboard"} replace /> : <Signup />,
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

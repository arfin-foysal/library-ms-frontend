
import { privateRoute } from "./privateRoute";

import { user } from "./utils";
import { Navigate } from "react-router-dom";
import Layout from './../components/layout/dashboardLayout/Layout';

const ProtectRoute = ({ r, children }) => {
  if (user) {
    if (r.role === user.role || r.role === "all") {
      return children;
    } else {
      return <Navigate to={"/not-access"} />;
    }
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export const getRoute = () => {
  const filterRoute = [];

  privateRoute.map((r) => {
    r.element = <ProtectRoute r={r}>{r.element}</ProtectRoute>;
    filterRoute.push(r);
  });
  return {
    path: "/dashboard",
    element: <Layout />,
    children: filterRoute,
  };
};

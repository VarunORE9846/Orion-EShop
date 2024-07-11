import React from "react";

import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const auth = localStorage.getItem("LoggedInUser");
  if (auth) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default PublicRoutes;

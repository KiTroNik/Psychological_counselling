import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context";
import { Navigate } from "react-router-dom";
import APP_ROUTES from "../../core/routes";
import { toast } from "react-toastify";

interface privateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: privateRouteProps) => {
  const [isLogged] = useState(localStorage.getItem("token") !== null);

  useEffect(() => {
    if (!isLogged) {
      toast.warning("You must log in to acces this page.", {
        toastId: "warning1",
      });
    }
  }, [isLogged]);

  return isLogged ? <>{children}</> : <Navigate to={APP_ROUTES.LOGIN} />;
};

export default PrivateRoute;

import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context";
import { Navigate } from "react-router-dom";
import APP_ROUTES from "../../core/routes";
import { toast } from "react-toastify";

interface privateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: privateRouteProps) => {
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    if (!isLogged) {
      toast.warning("You must log in to acces this page.", {
        toastId: "warning1",
      });
    }
  });

  return isLogged ? <>{children}</> : <Navigate to={APP_ROUTES.LOGIN} />;
};

export default PrivateRoute;

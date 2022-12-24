import { createBrowserRouter } from "react-router-dom";
import APP_ROUTES from "../routes";
import { LandingPage } from "../../pages/landing";
import App from "../../App";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ErrorPage } from "../../shared";

const router = createBrowserRouter([
  {
    path: APP_ROUTES.LANDING,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: APP_ROUTES.LANDING,
        element: <LandingPage />,
      },
      {
        path: APP_ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: APP_ROUTES.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;

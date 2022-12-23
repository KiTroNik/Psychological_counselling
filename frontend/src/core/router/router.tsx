import { createBrowserRouter } from "react-router-dom";
import APP_ROUTES from "../routes";
import { LandingPage } from "../../pages/landing";
import App from "../../App";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";

const router = createBrowserRouter([
  {
    path: APP_ROUTES.LANDING,
    element: <App />,
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

import { createBrowserRouter } from "react-router-dom";
import APP_ROUTES from "../routes";
import { LandingPage } from "../../pages/landing";
import App from "../../App";
import { LoginPage } from "../../pages/login";
import { RegisterPage } from "../../pages/register";
import { ErrorPage, PrivateRoute } from "../../shared";
import { DashboardPage, DashboardIndex } from "../../pages/dashboard";
import {
  AddPatientPage,
  EditPatientPage,
  ListPatientsPage,
} from "../../pages/patients";
import {
  AddAppointmentPage,
  EditAppointmentPage,
} from "../../pages/appointments";

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
      {
        path: APP_ROUTES.DASHBOARD,
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <DashboardIndex /> },
          {
            path: APP_ROUTES.ADD_PATIENT,
            element: (
              <PrivateRoute>
                <AddPatientPage />
              </PrivateRoute>
            ),
          },
          {
            path: APP_ROUTES.EDIT_PATIENT,
            element: (
              <PrivateRoute>
                <EditPatientPage />
              </PrivateRoute>
            ),
          },
          {
            path: APP_ROUTES.LIST_PATIENTS,
            element: (
              <PrivateRoute>
                <ListPatientsPage />
              </PrivateRoute>
            ),
          },
          {
            path: APP_ROUTES.ADD_APPOINTMENT,
            element: (
              <PrivateRoute>
                <AddAppointmentPage />
              </PrivateRoute>
            ),
          },
          {
            path: APP_ROUTES.EDIT_APPOINTMENT,
            element: (
              <PrivateRoute>
                <EditAppointmentPage />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;

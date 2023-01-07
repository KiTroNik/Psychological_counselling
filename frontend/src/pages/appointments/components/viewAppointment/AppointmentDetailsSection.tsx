import { Link } from "react-router-dom";
import APP_ROUTES from "../../../../core/routes";

interface AppointmentDetailsProps {
  id: number;
  name: string;
  date: string;
  is_cancelled: boolean;
  is_completed: boolean;
  patient_first_name: string;
  patient_last_name: string;
}

const AppointmentDetailsSection = ({
  id,
  name,
  date,
  is_cancelled,
  is_completed,
  patient_first_name,
  patient_last_name,
}: AppointmentDetailsProps) => {
  return (
    <div className="flex content-center items-center justify-center text-center">
      <Link to={APP_ROUTES.EDIT_APPOINTMENT.replace(":id", String(id))}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="m-auto m-3 h-24 w-24 stroke-indigo-600 stroke-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </Link>
      <div className="ml-4 p-6">
        <h3 className="mb-3 text-3xl font-bold text-blue-700">{name}</h3>
        <p className="mb-2 text-gray-700">{date}</p>
        <Link
          className="mb-3 font-medium leading-5 text-gray-900 underline hover:no-underline"
          to={APP_ROUTES.LIST_PATIENTS}
        >
          {patient_first_name} {patient_last_name}
        </Link>

        {is_cancelled && (
          <p className="mt-3 rounded-full bg-red-100 p-3 font-semibold leading-5 text-red-800">
            cancelled
          </p>
        )}

        {is_completed && (
          <p className="mt-3 rounded-full bg-green-100 p-3 font-semibold leading-5 text-green-800">
            completed
          </p>
        )}

        {!is_completed && !is_cancelled && (
          <p className="mt-3 rounded-full bg-blue-200 p-3 font-semibold leading-5 text-blue-800">
            planned
          </p>
        )}
      </div>
      <Link to={APP_ROUTES.LIST_APPOINTMENT}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="m-auto m-3 h-24 w-24 stroke-indigo-600 stroke-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
      </Link>
    </div>
  );
};

export default AppointmentDetailsSection;

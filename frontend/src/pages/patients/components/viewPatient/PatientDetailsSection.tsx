import { Link } from "react-router-dom";
import APP_ROUTES from "../../../../core/routes";

interface PatientDetailsProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  total_appointments: number;
  pending_appointments: number;
}

const PatientDetailsSection = ({
  id,
  first_name,
  last_name,
  email,
  total_appointments,
  pending_appointments,
}: PatientDetailsProps) => {
  return (
    <div className="flex content-center items-center justify-center text-center">
      <Link to={APP_ROUTES.LIST_PATIENTS}>
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
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      </Link>
      <div className="ml-4 p-6">
        <h3 className="mb-3 text-3xl font-bold text-blue-700">
          {first_name} {last_name}
        </h3>
        <p className="mb-2 text-gray-700">{email}</p>
        <p className="mb-2 text-gray-700">
          Total appointments: {total_appointments}
        </p>
        <p className="mb-2 text-gray-700">
          Pending appointments: {pending_appointments}
        </p>
      </div>
      <Link to={APP_ROUTES.EDIT_PATIENT.replace(":id", String(id))}>
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
    </div>
  );
};

export default PatientDetailsSection;

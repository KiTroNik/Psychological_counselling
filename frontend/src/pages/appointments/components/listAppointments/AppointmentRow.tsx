import { Link } from "react-router-dom";
import APP_ROUTES from "../../../../core/routes";
import { useDeletePatient } from "../../../patients/api";
import { useDeleteAppointment } from "../../api";

interface AppointmentRowProps {
  id: number;
  name: string;
  date: string;
  is_cancelled: boolean;
  is_completed: boolean;
  patient: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
}

const AppointmentRow = ({
  id,
  name,
  date,
  is_cancelled,
  is_completed,
  patient,
}: AppointmentRowProps) => {
  const mutation = useDeleteAppointment(id);

  return (
    <tr>
      <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
        <div className="flex items-center">
          <div className="ml-4">
            <Link
              to={APP_ROUTES.DETAILS_APPOINTMENT.replace(":id", String(id))}
              className="text-sm font-medium leading-5 text-gray-900 underline hover:no-underline"
            >
              {name}
            </Link>
          </div>
        </div>
      </td>
      <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
        <div className="text-sm leading-5 text-gray-500">{date}</div>
      </td>

      {patient !== null && (
        <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
          <div className="flex items-center">
            <Link
              to={APP_ROUTES.DETAILS_PATIENT.replace(":id", String(patient.id))}
              className="text-sm font-medium leading-5 text-gray-900 underline hover:no-underline"
            >
              {patient.first_name} {patient.last_name}
            </Link>
          </div>
        </td>
      )}

      {is_cancelled && (
        <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
          <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
            cancelled
          </span>
        </td>
      )}
      {is_completed && (
        <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
            completed
          </span>
        </td>
      )}
      {!is_completed && !is_cancelled && (
        <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
          <span className="inline-flex rounded-full bg-blue-200 px-2 text-xs font-semibold leading-5 text-blue-800">
            planned
          </span>
        </td>
      )}
      <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm leading-5 text-gray-500">
        <Link to={APP_ROUTES.EDIT_APPOINTMENT.replace(":id", String(id))}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-blue-400 hover:text-blue-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </Link>
      </td>
      <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm leading-5 text-gray-500">
        <button onClick={async () => await mutation.mutateAsync({ id })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-red-400 hover:text-red-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default AppointmentRow;

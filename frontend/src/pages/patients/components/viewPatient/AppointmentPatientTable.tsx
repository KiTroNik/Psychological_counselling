import { AppointmentRow } from "../../../appointments";
import { IAppointmentModel } from "../../models";

interface AppointmentPatientProps {
  title: string;
  appointments: IAppointmentModel[];
}

const AppointmentPatientTable = ({
  title,
  appointments,
}: AppointmentPatientProps) => {
  return (
    <div className="-my-2 overflow-x-auto pt-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <p className="mb-5 text-center text-3xl font-bold text-blue-500">
        {title}:
      </p>
      <div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
                Name
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
                Date
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
                Status
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
                Edit
              </th>
              <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
                Delete
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {appointments.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                id={appointment.id}
                name={appointment.name}
                date={appointment.date}
                is_cancelled={appointment.is_cancelled}
                is_completed={appointment.is_completed}
                patient={null}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentPatientTable;

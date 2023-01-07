import { useState } from "react";
import { PageLoader, Pagination } from "../../../../shared";
import { AppointmentRow, FilterAppointmentForm } from "./index";
import { useGetAppointmentList } from "../../api";
import { IAppointmentFilterModel } from "../../models";

const AppointmentsTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    date: null,
    name: "",
    is_cancelled: null,
    is_completed: null,
    patient_first_name: "",
    patient_last_name: "",
  } as IAppointmentFilterModel);
  const response = useGetAppointmentList(page, pageSize, filters);

  if (response.isLoading) {
    return <PageLoader />;
  }

  if (response.isSuccess) {
    return (
      <div className="mt-8 flex flex-col">
        <div className="text-center">
          <h2 className="mb-6 text-5xl font-bold text-indigo-500">
            Your Appointments
          </h2>
        </div>
        <FilterAppointmentForm setFilters={setFilters} />
        <div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
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
                    Patient
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
                {response.data.data.items.map((appointment) => (
                  <AppointmentRow
                    key={appointment.id}
                    id={appointment.id}
                    name={appointment.name}
                    date={appointment.date}
                    is_cancelled={appointment.is_cancelled}
                    is_completed={appointment.is_completed}
                    patient={appointment.patient}
                  />
                ))}
              </tbody>
            </table>
            <Pagination
              setPage={setPage}
              page={page}
              total={response.data.data.total}
              pageSize={pageSize}
            />
          </div>
        </div>
      </div>
    );
  }

  return <PageLoader />;
};

export default AppointmentsTable;

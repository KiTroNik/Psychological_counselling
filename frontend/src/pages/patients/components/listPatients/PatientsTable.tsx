import { useState } from "react";
import { useGetPatientList } from "../../api";
import { Pagination, PatientRow, SearchPatientForm } from "./index";
import { PageLoader } from "../../../../shared";
import { IPatientFilterModel } from "../../models";

const PatientsTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    first_name: "",
    last_name: "",
    email: "",
  } as IPatientFilterModel);
  const response = useGetPatientList(page, pageSize, filters);

  if (response.isLoading) {
    return <PageLoader />;
  }

  if (response.isSuccess) {
    return (
      <div className="mt-8 flex flex-col">
        <SearchPatientForm setFilters={setFilters} />
        <div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
                    Email
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
                {response.data.data.items.map((patient) => (
                  <PatientRow
                    key={patient.id}
                    id={patient.id}
                    first_name={patient.first_name}
                    last_name={patient.last_name}
                    email={patient.email}
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

export default PatientsTable;

import { useParams } from "react-router-dom";
import { useGetPatient } from "../../api";
import { PageLoader } from "../../../../shared";
import { AppointmentPatientTable, PatientDetailsSection } from "./index";
import { getAppointmentsLists } from "../../utils";

const PatientDetailsCard = () => {
  const params = useParams() as { id: string };
  const patient = useGetPatient(parseInt(params.id));

  if (patient.isLoading) {
    return <PageLoader />;
  }

  if (patient.isSuccess) {
    const {
      total_appointments,
      planned_appointments,
      completed_appointments,
      cancelled_appointments,
    } = getAppointmentsLists(patient.data.data.appointments);

    return (
      <div className="min-w-full border-b border-gray-200 bg-white align-middle shadow sm:rounded-lg">
        <PatientDetailsSection
          id={patient.data.data.id}
          first_name={patient.data.data.first_name}
          last_name={patient.data.data.last_name}
          email={patient.data.data.email}
          total_appointments={total_appointments}
          pending_appointments={planned_appointments.length}
        />

        <div className="mt-2">
          <h3 className="mb-5 text-center text-4xl font-bold text-blue-700">
            History of Appointments
          </h3>

          {total_appointments === 0 && (
            <p className="mb-5 text-center text-3xl font-bold text-blue-500">
              No appointments
            </p>
          )}

          {planned_appointments.length !== 0 && (
            <AppointmentPatientTable
              title={"Planned"}
              appointments={planned_appointments}
            />
          )}

          {completed_appointments.length !== 0 && (
            <AppointmentPatientTable
              title={"Completed"}
              appointments={completed_appointments}
            />
          )}

          {cancelled_appointments.length !== 0 && (
            <AppointmentPatientTable
              title={"Cancelled"}
              appointments={cancelled_appointments}
            />
          )}
        </div>
      </div>
    );
  }

  return <PageLoader />;
};

export default PatientDetailsCard;

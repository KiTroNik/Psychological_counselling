import { EditAppointmentForm } from "./index";

const EditAppointmentPage = () => {
  return (
    <div>
      <div className="pt-12 text-center">
        <h2 className="mb-6 text-5xl font-bold text-indigo-500">
          Edit Appointment
        </h2>
      </div>

      <div className="mb-20 pt-10">
        <EditAppointmentForm />
      </div>
    </div>
  );
};

export default EditAppointmentPage;

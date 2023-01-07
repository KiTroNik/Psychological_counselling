import { AppointmentDetailsCard } from "./index";

const AppointmentDetailsPage = () => {
  return (
    <div className="mx-auto mt-8 max-w-screen-2xl">
      <div className="text-center">
        <h2 className="mb-6 text-5xl font-bold text-indigo-500">
          Appointment Details
        </h2>
      </div>

      <AppointmentDetailsCard />
    </div>
  );
};

export default AppointmentDetailsPage;

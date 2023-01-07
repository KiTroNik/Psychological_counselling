import { PatientDetailsCard } from "./index";

const PatientDetailsPage = () => {
  return (
    <div className="mx-auto mt-8 max-w-screen-2xl">
      <div className="text-center">
        <h2 className="mb-6 text-5xl font-bold text-indigo-500">
          Patient Details
        </h2>
      </div>

      <PatientDetailsCard />
    </div>
  );
};

export default PatientDetailsPage;

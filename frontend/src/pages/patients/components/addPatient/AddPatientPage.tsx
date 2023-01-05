import { AddPatientForm } from "./index";

const AddPatientPage = () => {
  return (
    <div>
      <div className="pt-12 text-center">
        <h2 className="mb-6 text-5xl font-bold text-indigo-500">Add Patient</h2>
      </div>

      <div className="mb-20 pt-10">
        <AddPatientForm />
      </div>
    </div>
  );
};

export default AddPatientPage;

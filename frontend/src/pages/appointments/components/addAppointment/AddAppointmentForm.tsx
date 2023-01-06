import { SubmitHandler, useForm } from "react-hook-form";
import { IAddAppointmentModel } from "../../models";
import { useAddAppointment, useGetPatientsWithoutPagination } from "../../api";
import { PageLoader } from "../../../../shared";

const AddAppointmentForm = () => {
  const patients = useGetPatientsWithoutPagination();
  const mutation = useAddAppointment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddAppointmentModel>({
    defaultValues: {
      date: "",
      name: "",
      patient_id: "",
    },
  });

  const onSubmit: SubmitHandler<IAddAppointmentModel> = async (data) => {
    try {
      await mutation.mutateAsync(data);
      reset();
    } catch (err) {
      /* empty */
    }
  };

  if (patients.isLoading) {
    return <PageLoader />;
  }

  if (patients.isSuccess) {
    return (
      <div className="block rounded-lg bg-white p-6 shadow-lg sm:mx-auto sm:max-w-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="m-auto mb-6 h-24 w-24 stroke-indigo-600 stroke-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label
              htmlFor="name"
              className="form-label mb-2 inline-block text-gray-700"
            >
              Name of appointment
            </label>
          </div>
          <div>
            <input
              id="name"
              {...register("name", {
                required: "Name is required.",
                minLength: {
                  value: 3,
                  message: "Name must have at least 3 characters.",
                },
              })}
              type="text"
              className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
              placeholder="Enter appointment Name"
            />
            <p className="mb-6 text-red-500">{errors.name?.message}</p>
          </div>

          <div className="form-group">
            <label
              htmlFor="date"
              className="form-label mb-2 inline-block text-gray-700"
            >
              Date
            </label>
          </div>
          <div>
            <input
              id="date"
              {...register("date", {
                required: true,
              })}
              type="date"
              className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
              placeholder="Pick the date"
            />
            <p className="mb-6 text-red-500">{errors.date?.message}</p>
          </div>

          <div className="form-group">
            <label
              htmlFor="patient_id"
              className="form-label mb-2 inline-block text-gray-700"
            >
              Patient
            </label>
          </div>
          <div>
            <select
              {...register("patient_id", {
                required: true,
              })}
              className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            >
              {patients.data.data.map((patient) => {
                return (
                  <option key={patient.id} value={patient.id}>
                    {patient.first_name} {patient.last_name}
                  </option>
                );
              })}
            </select>
            <p className="mb-6 text-red-500">{errors.patient_id?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-lg transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-2xl active:bg-indigo-700 active:shadow-2xl"
          >
            Add Appointment
          </button>
        </form>
      </div>
    );
  }

  return <PageLoader />;
};

export default AddAppointmentForm;

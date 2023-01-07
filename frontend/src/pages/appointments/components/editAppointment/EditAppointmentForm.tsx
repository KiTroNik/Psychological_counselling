import {
  useEditAppointment,
  useGetAppointment,
  useGetPatientsWithoutPagination,
} from "../../api";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAppointmentModel } from "../../models";
import { PageLoader } from "../../../../shared";
import { useNavigate, useParams } from "react-router-dom";
import APP_ROUTES from "../../../../core/routes";

const EditAppointmentForm = () => {
  const params = useParams() as { id: string };
  const patients = useGetPatientsWithoutPagination();
  const appointment = useGetAppointment(parseInt(params.id));
  const mutation = useEditAppointment(parseInt(params.id));
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IAppointmentModel>();

  const onSubmit: SubmitHandler<IAppointmentModel> = async (data) => {
    try {
      await mutation.mutateAsync(data);
      navigate(APP_ROUTES.DASHBOARD);
    } catch (err) {
      /* empty */
    }
  };

  if (patients.isLoading || appointment.isLoading) {
    return <PageLoader />;
  }

  if (patients.isSuccess && appointment.isSuccess) {
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
          <div className="flex justify-center gap-5">
            <div className="form-group">
              <input
                {...register("is_cancelled")}
                className="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                type="checkbox"
                id="is_cancelled"
                defaultChecked={appointment.data.data.is_cancelled}
                disabled={watch("is_completed")}
              />
              <label
                htmlFor="name"
                className="form-label mb-2 inline-block text-gray-700"
              >
                Cancelled
              </label>
            </div>

            <div className="form-group">
              <input
                {...register("is_completed")}
                className="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                type="checkbox"
                id="is_completed"
                defaultChecked={appointment.data.data.is_completed}
                disabled={watch("is_cancelled")}
              />
              <label
                htmlFor="name"
                className="form-label mb-2 inline-block text-gray-700"
              >
                Completed
              </label>
            </div>
          </div>

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
              defaultValue={appointment.data.data.name}
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
              defaultValue={appointment.data.data.date}
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
              {...register("patient.id", {
                required: true,
              })}
              className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
              defaultValue={appointment.data.data.patient.id}
            >
              {patients.data.data.map((patient) => {
                return (
                  <option key={patient.id} value={patient.id}>
                    {patient.first_name} {patient.last_name}
                  </option>
                );
              })}
            </select>
            <p className="mb-6 text-red-500">{errors.patient?.id?.message}</p>
          </div>
          <div className="form-group">
            <label
              htmlFor="date"
              className="form-label mb-2 inline-block text-gray-700"
            >
              Notes
            </label>
          </div>
          <div>
            <textarea
              id="notes"
              {...register("notes")}
              defaultValue={appointment.data.data.notes}
              className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
              placeholder="Write the notes"
            />
            <p className="mb-6 text-red-500">{errors.date?.message}</p>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-lg transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-2xl active:bg-indigo-700 active:shadow-2xl"
          >
            Edit Appointment
          </button>
        </form>
      </div>
    );
  }

  return <PageLoader />;
};

export default EditAppointmentForm;

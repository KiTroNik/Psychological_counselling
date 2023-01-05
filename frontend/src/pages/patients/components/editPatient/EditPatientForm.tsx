import { SubmitHandler, useForm } from "react-hook-form";
import { IAddPatientProps } from "../../models";
import { useNavigate, useParams } from "react-router-dom";
import { useEditPatient, useGetPatient } from "../../api";
import { PageLoader } from "../../../../shared";
import APP_ROUTES from "../../../../core/routes";

const EditPatientForm = () => {
  const params = useParams() as { id: string };
  const response = useGetPatient(parseInt(params.id));
  const mutation = useEditPatient(parseInt(params.id));
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddPatientProps>();

  const onSubmit: SubmitHandler<IAddPatientProps> = async (data) => {
    try {
      await mutation.mutateAsync(data);
      navigate(APP_ROUTES.DASHBOARD);
    } catch (err) {
      /* empty */
    }
  };

  if (response.isLoading) {
    return <PageLoader />;
  }

  if (response.data && response.isSuccess) {
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
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label
              htmlFor="firstName"
              className="form-label mb-2 inline-block text-gray-700"
            >
              First Name
            </label>
          </div>
          <div>
            <input
              id="firstName"
              {...register("firstName", {
                required: "First Name is required.",
                minLength: {
                  value: 3,
                  message: "First Name must have at least 3 characters.",
                },
              })}
              defaultValue={response.data.data.first_name}
              type="text"
              className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
              placeholder="Enter First Name"
            />
            <p className="mb-6 text-red-500">{errors.firstName?.message}</p>
          </div>

          <div className="form-group">
            <label
              htmlFor="lastName"
              className="form-label mb-2 inline-block text-gray-700"
            >
              Last Name
            </label>
          </div>
          <div>
            <input
              id="lastName"
              {...register("lastName", {
                required: "Last Name is required.",
                minLength: {
                  value: 3,
                  message: "Last Name must have at least 3 characters.",
                },
              })}
              defaultValue={response.data.data.last_name}
              type="text"
              className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
              placeholder="Enter Last Name"
            />
            <p className="mb-6 text-red-500">{errors.lastName?.message}</p>
          </div>

          <div className="form-group">
            <label
              htmlFor="email"
              className="form-label mb-2 inline-block text-gray-700"
            >
              Enter Email Address
            </label>
          </div>
          <div>
            <input
              id="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "This should be valid email address.",
                },
              })}
              defaultValue={response.data.data.email}
              type="text"
              className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
              placeholder="Enter Email Address"
            />
            <p className="mb-6 text-red-500">{errors.email?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-lg transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-2xl active:bg-indigo-700 active:shadow-2xl"
          >
            Edit patient
          </button>
        </form>
      </div>
    );
  }

  return <PageLoader />;
};

export default EditPatientForm;

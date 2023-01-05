import { useApi } from "../../../core";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddPatientProps } from "../models";

const AddPatientForm = () => {
  const api = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddPatientProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IAddPatientProps> = async (data) => {};

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
          d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
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
                value: /^\S+@\S+$/i,
                message: "This should be valid email address.",
              },
            })}
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Enter Email Address"
          />
          <p className="mb-6 text-red-500">{}</p>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-lg transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-2xl active:bg-indigo-700 active:shadow-2xl"
        >
          Add patient
        </button>
      </form>
    </div>
  );
};

export default AddPatientForm;

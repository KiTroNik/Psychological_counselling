import { SubmitHandler, useForm } from "react-hook-form";
import { IPatientFilterModel } from "../../models";
import React from "react";

interface SearchPatientProps {
  setFilters: React.Dispatch<React.SetStateAction<IPatientFilterModel>>;
}

const SearchPatientForm = ({ setFilters }: SearchPatientProps) => {
  const { register, handleSubmit, reset } = useForm<IPatientFilterModel>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IPatientFilterModel> = (data) => {
    setFilters({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    });
  };

  return (
    <div className="mx-auto">
      <form
        className="align-items-center align-content-center justify-content-center mb-4 flex gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            id="firstName"
            {...register("first_name")}
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="First Name"
          />
        </div>

        <div>
          <input
            id="lastName"
            {...register("last_name")}
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Last Name"
          />
        </div>

        <div>
          <input
            id="email"
            {...register("email")}
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Email"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-6 py-2.5 text-xs font-medium text-white shadow-lg transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-2xl active:bg-indigo-700 active:shadow-2xl"
        >
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          }
        </button>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-blue-500 px-6 py-2.5 text-xs font-medium text-white shadow-lg transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-2xl active:bg-indigo-700 active:shadow-2xl"
        >
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          }
        </button>
      </form>
    </div>
  );
};

export default SearchPatientForm;

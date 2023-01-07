import { IAppointmentFilterModel } from "../../models";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FilterAppointmentProps {
  setFilters: React.Dispatch<React.SetStateAction<IAppointmentFilterModel>>;
}

const FilterAppointmentForm = ({ setFilters }: FilterAppointmentProps) => {
  const { register, handleSubmit, reset } = useForm<IAppointmentFilterModel>({
    defaultValues: {
      date: null,
      name: "",
      is_cancelled: null,
      is_completed: null,
      patient_first_name: "",
      patient_last_name: "",
    },
  });

  const onSubmit: SubmitHandler<IAppointmentFilterModel> = (data) => {
    setFilters({
      date: data.date,
      name: data.name,
      is_cancelled: data.is_cancelled,
      is_completed: data.is_completed,
      patient_first_name: data.patient_first_name,
      patient_last_name: data.patient_last_name,
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
            {...register("is_cancelled")}
            className="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
            type="checkbox"
            id="is_cancelled"
          />
          <label
            htmlFor="name"
            className="form-label mb-2 inline-block text-gray-700"
          >
            Cancelled
          </label>
        </div>

        <div>
          <input
            {...register("is_completed")}
            className="form-check-input float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
            type="checkbox"
            id="is_completed"
          />
          <label
            htmlFor="name"
            className="form-label mb-2 inline-block text-gray-700"
          >
            Completed
          </label>
        </div>

        <div>
          <input
            id="date"
            {...register("date")}
            type="date"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Date"
          />
        </div>

        <div>
          <input
            id="name"
            {...register("name")}
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Name of appointment"
          />
        </div>

        <div>
          <input
            id="patient_first_name"
            {...register("patient_first_name")}
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Patient First Name"
          />
        </div>

        <div>
          <input
            id="patient_last_name"
            {...register("patient_last_name")}
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Patient Last Name"
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

export default FilterAppointmentForm;

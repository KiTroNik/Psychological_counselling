import { useParams } from "react-router-dom";
import { useEditAppointment, useGetAppointment } from "../../api";
import { PageLoader } from "../../../../shared";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAppointmentModel } from "../../models";
import { AppointmentDetailsSection } from "./index";

const AppointmentDetailsCard = () => {
  const params = useParams() as { id: string };
  const appointment = useGetAppointment(parseInt(params.id));
  const mutation = useEditAppointment(parseInt(params.id));
  const { register, handleSubmit } = useForm<IAppointmentModel>();

  const onSubmit: SubmitHandler<IAppointmentModel> = async (data) => {
    try {
      data.is_completed = true;
      await mutation.mutateAsync(data);
    } catch (err) {
      /* empty */
    }
  };

  const onCancel: SubmitHandler<IAppointmentModel> = async (data) => {
    try {
      data.is_cancelled = true;
      await mutation.mutateAsync(data);
    } catch (err) {
      /* empty */
    }
  };

  if (appointment.isLoading) {
    return <PageLoader />;
  }

  if (appointment.isSuccess) {
    return (
      <div className="min-w-full border-b border-gray-200 bg-white align-middle shadow sm:rounded-lg">
        <AppointmentDetailsSection
          id={appointment.data.data.id}
          name={appointment.data.data.name}
          date={appointment.data.data.date}
          is_cancelled={appointment.data.data.is_cancelled}
          is_completed={appointment.data.data.is_completed}
          patient_first_name={appointment.data.data.patient.first_name}
          patient_last_name={appointment.data.data.patient.last_name}
        />

        <div className="mt-2 text-center">
          <h3 className="mb-3 text-4xl font-bold text-blue-700">Notes</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6">
              <textarea
                id="notes"
                {...register("notes")}
                defaultValue={appointment.data.data.notes}
                className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
                placeholder="Write the notes"
                rows={15}
                disabled={
                  appointment.data.data.is_completed ||
                  appointment.data.data.is_cancelled
                }
              />
            </div>
            {!appointment.data.data.is_completed &&
              !appointment.data.data.is_cancelled && (
                <div className="mb-5 flex justify-center gap-5">
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-lg transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-2xl active:bg-blue-700 active:shadow-2xl"
                  >
                    Complete
                  </button>
                  <button
                    onClick={handleSubmit(onCancel)}
                    className="rounded-lg bg-indigo-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-lg transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-2xl active:bg-indigo-700 active:shadow-2xl"
                  >
                    Cancel
                  </button>
                </div>
              )}
          </form>
        </div>
      </div>
    );
  }

  return <PageLoader />;
};

export default AppointmentDetailsCard;

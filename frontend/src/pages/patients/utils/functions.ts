import { IAppointmentModel } from "../models";

export const getAppointmentsLists = (
  appointments: IAppointmentModel[] | null
) => {
  if (appointments !== null) {
    const total_appointments = appointments.length;
    const planned_appointments = appointments.filter(
      (obj) => !obj.is_cancelled && !obj.is_completed
    );
    const completed_appointments = appointments.filter(
      (obj) => obj.is_completed
    );
    const cancelled_appointments = appointments.filter(
      (obj) => obj.is_cancelled
    );

    return {
      total_appointments,
      planned_appointments,
      completed_appointments,
      cancelled_appointments,
    };
  }

  return {
    total_appointments: 0,
    planned_appointments: [],
    completed_appointments: [],
    cancelled_appointments: [],
  };
};

interface IAppointmentFilterModel {
  date?: string | null;
  name?: string | null;
  is_cancelled?: boolean | null;
  is_completed?: boolean | null;
  patient_first_name?: string | null;
  patient_last_name?: string | null;
}

export default IAppointmentFilterModel;

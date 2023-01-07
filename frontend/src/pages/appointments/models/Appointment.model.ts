interface IAppointmentModel {
  date: string;
  name: string;
  is_cancelled: boolean;
  is_completed: boolean;
  notes: string;
  id: number;
  patient: {
    first_name: string;
    last_name: string;
    email: string;
    id: number;
  };
}

export default IAppointmentModel;

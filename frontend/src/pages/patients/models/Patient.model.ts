import { IAppointmentModel } from "./index";

interface IPatientModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  appointments: IAppointmentModel[] | null;
}

export default IPatientModel;

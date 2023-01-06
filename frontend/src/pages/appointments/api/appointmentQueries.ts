import { API_URLS, useApi } from "../../../core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IAxiosResponseModel } from "../../../shared/models";
import { IPatientModel } from "../../patients/models";
import { AxiosError } from "axios";
import { IAddAppointmentModel } from "../models";
import { toast } from "react-toastify";

export const useGetPatientsWithoutPagination = () => {
  const api = useApi();
  return useQuery<IAxiosResponseModel<IPatientModel[]>, AxiosError>({
    queryKey: [
      "patientsWithoutPagination",
      API_URLS.PATIENTS.LIST_WITHOUT_PAGINATION,
    ],
    queryFn: async () => {
      return await api.get(API_URLS.PATIENTS.LIST_WITHOUT_PAGINATION);
    },
  });
};

export const useAddAppointment = () => {
  const api = useApi();
  return useMutation<IAddAppointmentModel, AxiosError, IAddAppointmentModel>(
    async (data) => {
      return await api.post(API_URLS.APPOINTMENTS.ADD_LIST, data);
    },
    {
      onSuccess: () => {
        toast.success("Appointment added successfully.");
      },
      onError: () => {
        toast.error("Sorry something went wrong");
      },
    }
  );
};

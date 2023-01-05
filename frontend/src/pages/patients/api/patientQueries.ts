import { API_URLS, useApi } from "../../../core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IAddEditPatientModel, IPatientModel } from "../models";

export const useAddPatient = () => {
  const api = useApi();
  return useMutation<IAddEditPatientModel, AxiosError, IAddEditPatientModel>(
    async (data) => {
      return await api.post(API_URLS.PATIENTS.ADD_LIST, {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
      });
    },
    {
      onSuccess: () => {
        toast.success("Patient added successfully.");
      },
      onError: () => {
        toast.error("Sorry something went wrong.");
      },
    }
  );
};

export const useGetPatient = (id: number) => {
  const api = useApi();
  return useQuery<IPatientModel, AxiosError>({
    queryKey: ["patient", id],
    queryFn: async () => {
      return await api.get(API_URLS.PATIENTS.DETAILS(id));
    },
  });
};

export const useEditPatient = (id: number) => {
  const api = useApi();
  return useMutation<IAddEditPatientModel, AxiosError, IAddEditPatientModel>(
    async (data) => {
      return await api.patch(API_URLS.PATIENTS.DETAILS(id), {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
      });
    },
    {
      onSuccess: () => {
        toast.success("Patient edited successfully.");
      },
      onError: () => {
        toast.error("Sorry something went wrong.");
      },
    }
  );
};

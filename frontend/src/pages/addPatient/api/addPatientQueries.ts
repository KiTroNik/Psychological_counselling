import { API_URLS, useApi } from "../../../core";
import { useMutation } from "@tanstack/react-query";
import { IAddUserModel } from "../models";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useAddPatient = () => {
  const api = useApi();
  return useMutation<IAddUserModel, AxiosError, IAddUserModel>(
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

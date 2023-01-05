import { useMutation } from "@tanstack/react-query";
import { API_URLS, useApi } from "../../../core";
import { IRegisterProps, IUserModel } from "../models";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useRegister = () => {
  const api = useApi();
  return useMutation<IRegisterProps, AxiosError, IUserModel>(
    async (data) => {
      return await api.post(API_URLS.AUTHORIZATION.REGISTER, data);
    },
    {
      onSuccess: () => {
        toast.success("You can now log in.");
      },
      onError: () => {
        toast.error("Sorry something went wrong.");
      },
    }
  );
};

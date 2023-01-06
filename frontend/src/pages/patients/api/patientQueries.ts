import { API_URLS, useApi } from "../../../core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  IAddEditPatientModel,
  IPatientFilterModel,
  IPatientModel,
} from "../models";
import {
  IAxiosResponseModel,
  IPaginatedResponse,
} from "../../../shared/models";

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
  return useQuery<IAxiosResponseModel<IPatientModel>, AxiosError>({
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

export const useGetPatientList = (
  page: number,
  size: number,
  filters: IPatientFilterModel
) => {
  const api = useApi();
  return useQuery<
    IAxiosResponseModel<IPaginatedResponse<IPatientModel[]>>,
    AxiosError
  >({
    queryKey: ["patientList", page, size, API_URLS.PATIENTS.ADD_LIST, filters],
    queryFn: async () => {
      return await api.get(API_URLS.PATIENTS.ADD_LIST, {
        params: { page, size, ...filters },
      });
    },
    keepPreviousData: true,
  });
};

export const useDeletePatient = (id: number) => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<{ id: number }, AxiosError, { id: number }>(
    async () => {
      return await api.delete(API_URLS.PATIENTS.DETAILS(id));
    },
    {
      onSuccess: () => {
        toast.success("Successfully deleted");
      },
      onError: () => {
        toast.error("Sorry something went wrong.");
      },
      onSettled: () => {
        void queryClient.invalidateQueries(["patientList"]);
      },
    }
  );
};

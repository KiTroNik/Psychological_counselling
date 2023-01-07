import { API_URLS, useApi } from "../../../core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IAxiosResponseModel,
  IPaginatedResponse,
} from "../../../shared/models";
import { IPatientModel } from "../../patients/models";
import { AxiosError } from "axios";
import {
  IAddAppointmentModel,
  IAppointmentFilterModel,
  IAppointmentModel,
} from "../models";
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

export const useGetAppointment = (id: number) => {
  const api = useApi();
  return useQuery<IAxiosResponseModel<IAppointmentModel>, AxiosError>({
    queryKey: ["appointment", id],
    queryFn: async () => {
      return await api.get(API_URLS.APPOINTMENTS.DETAILS(id));
    },
  });
};

export const useEditAppointment = (id: number) => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<IAppointmentModel, AxiosError, IAppointmentModel>(
    async (data) => {
      return await api.patch(API_URLS.APPOINTMENTS.DETAILS(id), data);
    },
    {
      onSuccess: () => {
        toast.success("Appointment edited successfully.");
      },
      onError: () => {
        toast.error("Sorry something went wrong.");
      },
      onSettled: () => {
        void queryClient.invalidateQueries(["appointment"]);
      },
    }
  );
};

export const useGetAppointmentList = (
  page: number,
  size: number,
  filters: IAppointmentFilterModel
) => {
  const { date, ...finalFilters } = filters;
  const api = useApi();
  return useQuery<
    IAxiosResponseModel<IPaginatedResponse<IAppointmentModel[]>>,
    AxiosError
  >({
    queryKey: [
      "appointmentList",
      page,
      size,
      filters,
      date,
      API_URLS.APPOINTMENTS.ADD_LIST,
      finalFilters,
    ],
    queryFn: async () => {
      return await api.get(API_URLS.APPOINTMENTS.ADD_LIST, {
        params: { page, size, ...finalFilters, ...(date && { date }) },
      });
    },
    keepPreviousData: true,
  });
};

export const useDeleteAppointment = (id: number) => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation<{ id: number }, AxiosError, { id: number }>(
    async () => {
      return await api.delete(API_URLS.APPOINTMENTS.DETAILS(id));
    },
    {
      onSuccess: () => {
        toast.success("Successfully deleted.");
      },
      onError: () => {
        toast.error("Sorry something went wrong.");
      },
      onSettled: () => {
        void queryClient.invalidateQueries(["appointmentList"]);
      },
    }
  );
};

import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../../shared/context/AuthContext";
import { ILogin } from "../../../pages/login/models";

const baseUrl = "http://localhost:8000/api/v1";

const UseApi = () => {
  const { isLogged, logout } = useContext(AuthContext);

  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: isLogged
        ? `Bearer ${localStorage.getItem("token") || ""}`
        : "",
    },
    withCredentials: true,
  });

  if (isLogged) {
    api.interceptors.response.use(
      // eslint-disable-next-line @typescript-eslint/require-await
      async (response) => {
        return response;
      },
      async (error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        const orginalRequest = error.config;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error.response.status === 401 && !orginalRequest._retry) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            orginalRequest._retry = true;
            const response = await axios.get<ILogin>(
              "http://localhost:8000/api/v1/auth/refresh",
              {
                withCredentials: true,
              }
            );
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            localStorage.setItem("token", response.data.access_token);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return axios(orginalRequest);
          } catch (responseError) {
            logout();
            localStorage.removeItem("token");
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return Promise.reject(responseError.response);
          }
        }
        logout();
        localStorage.removeItem("token");
        return Promise.reject(error);
      }
    );
  }

  return api;
};

export default UseApi;

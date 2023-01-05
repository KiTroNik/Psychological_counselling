const API_URLS = {
  AUTHORIZATION: {
    LOGIN: "/auth/token/",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
  },
  PATIENTS: {
    ADD_LIST: "/patients",
    DETAILS: (id: number) => `/patients/${id}`,
  },
};

export default API_URLS;

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
    LIST_WITHOUT_PAGINATION: "/patients/without_pagination",
  },
  APPOINTMENTS: {
    ADD_LIST: "/appointments",
  },
};

export default API_URLS;

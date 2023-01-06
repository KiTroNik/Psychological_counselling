import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";
import { API_URLS, useApi } from "../../core";
import APP_ROUTES from "../../core/routes";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const api = useApi();

  const handleLogout = async () => {
    await api.get(API_URLS.AUTHORIZATION.LOGOUT);
    logout();
    localStorage.removeItem("token");
    navigate(APP_ROUTES.LANDING);
  };

  return (
    <div className="flex h-screen flex-col justify-between border-r bg-white">
      <div className="divide-y divide-purple-700 px-4 py-6">
        <h2 className="text-center text-xl font-bold text-blue-700">
          MyCabinet
        </h2>

        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              <span className="ml-3 text-sm font-medium"> Patients </span>

              <span className="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Teams Nav" className="mt-1.5 ml-8 flex flex-col">
              <NavLink
                to={APP_ROUTES.ADD_PATIENT}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "flex items-center rounded-lg bg-gray-200 px-4 py-2 text-gray-700 text-blue-700"
                    : isPending
                    ? "flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                    : "flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-5 w-5 opacity-75"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span className="ml-3 text-sm font-medium"> Add </span>
              </NavLink>

              <NavLink
                to={APP_ROUTES.LIST_PATIENTS}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "flex items-center rounded-lg bg-gray-200 px-4 py-2 text-gray-700 text-blue-700"
                    : isPending
                    ? "flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                    : "flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-5 w-5 opacity-75"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <span className="ml-3 text-sm font-medium"> List </span>
              </NavLink>
            </nav>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-5 w-5 opacity-75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>

              <span className="ml-3 text-sm font-medium"> Appointments </span>

              <span className="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav aria-label="Account Nav" className="mt-1.5 ml-8 flex flex-col">
              <NavLink
                to={APP_ROUTES.ADD_APPOINTMENT}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "flex items-center rounded-lg bg-gray-200 px-4 py-2 text-gray-700 text-blue-700"
                    : isPending
                    ? "flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                    : "flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-5 w-5 opacity-75"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span className="ml-3 text-sm font-medium"> Add </span>
              </NavLink>

              <a
                href="/"
                className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-5 w-5 opacity-75"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <span className="ml-3 text-sm font-medium"> List </span>
              </a>
            </nav>
          </details>

          <a
            href="http://0.0.0.0:8000/docs/"
            className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-5 w-5 opacity-75"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>

            <span className="ml-3 text-sm font-medium">
              {" "}
              API Documentation{" "}
            </span>
          </a>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>

          <span className="ml-3 text-sm font-medium"> Logout </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

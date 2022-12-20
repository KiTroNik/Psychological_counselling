import { UserSVG } from "../../../shared";
import { Link } from "react-router-dom";
import APP_ROUTES from "../../../core/routes";

const RegisterForm = () => {
  return (
    <div className="block rounded-lg bg-white p-6 shadow-lg sm:mx-auto sm:max-w-lg">
      <UserSVG clsName="mb-6 h-24 w-24 m-auto stroke-1 stroke-indigo-600" />

      <p className="font-gray-800 mb-6 text-center text-xl font-bold">
        Sign up to create account
      </p>

      <form>
        <div className="form-group">
          <label
            htmlFor="first_name"
            className="form-label mb-2 inline-block text-gray-700"
          >
            First Name
          </label>
        </div>
        <div>
          <input
            id="first_name"
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Enter First Name"
          />
          <p className="mb-6 text-red-500">{}</p>
        </div>

        <div className="form-group">
          <label
            htmlFor="last_name"
            className="form-label mb-2 inline-block text-gray-700"
          >
            Last Name
          </label>
        </div>
        <div>
          <input
            id="last_name"
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Enter Last Name"
          />
          <p className="mb-6 text-red-500">{}</p>
        </div>

        <div className="form-group">
          <label
            htmlFor="email"
            className="form-label mb-2 inline-block text-gray-700"
          >
            Email address
          </label>
        </div>
        <div>
          <input
            id="email"
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Enter email"
          />
          <p className="mb-6 text-red-500">{}</p>
        </div>

        <div className="form-group">
          <label
            htmlFor="password"
            className="form-label mb-2 inline-block text-gray-700"
          >
            Password
          </label>
        </div>
        <div>
          <input
            id="password"
            type="password"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Password"
          />
          <p className="mb-6 text-red-500">{}</p>
        </div>

        <div className="form-group">
          <label
            htmlFor="confirm_password"
            className="form-label mb-2 inline-block text-gray-700"
          >
            Confirm Password
          </label>
        </div>
        <div>
          <input
            id="confirm_password"
            type="password"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Confirm password"
          />
          <p className="mb-6 text-red-500">{}</p>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-lg transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-2xl active:bg-indigo-700 active:shadow-2xl"
        >
          Sign up
        </button>
      </form>

      <p className="mt-6 text-center text-gray-500">
        Already have an account?{" "}
        <Link
          to={APP_ROUTES.LOGIN}
          className="text-blue-600 transition duration-200 ease-in-out hover:text-blue-700"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;

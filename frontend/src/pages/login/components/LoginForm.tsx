import { Link } from "react-router-dom";
import { UserSVG } from "../../../shared";

const LoginForm = () => {
  return (
    <div className="block rounded-lg bg-white p-6 shadow-lg sm:mx-auto sm:max-w-lg">
      <UserSVG clsName="mb-6 h-24 w-24 m-auto stroke-1 stroke-indigo-600" />

      <p className="font-gray-800 mb-6 text-center text-xl font-bold">
        Sign in to your account
      </p>

      <form action="#" method="POST">
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
            name="email"
            type="email"
            autoComplete="email"
            required
            className="form-control font normal m-0 mb-6 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Enter email"
          />
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
            name="password"
            type="password"
            required
            className="form-control font normal m-0 mb-6 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-lg transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-2xl active:bg-indigo-700 active:shadow-2xl"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-gray-500">
        No account?{" "}
        <Link
          to="/"
          className="text-blue-600 transition duration-200 ease-in-out hover:text-blue-700"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

import { Link, useNavigate } from "react-router-dom";
import { UserSVG } from "../../../shared";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useContext, useState } from "react";
import AuthContext from "../../../shared/context/AuthContext";
import { useApi } from "../../../core";
import { ILogin } from "../models";
import APP_ROUTES from "../../../core/routes";

type Inputs = {
  email: string;
  password: string;
};

interface IErorr {
  response: {
    data: {
      detail: string;
    };
  };
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const { login } = useContext(AuthContext);
  const api = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const bodyFormData = new FormData();
    bodyFormData.append("username", data.email);
    bodyFormData.append("password", data.password);

    try {
      const response = await api.post<ILogin>(
        "http://localhost:8000/api/v1/auth/token",
        bodyFormData,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      localStorage.setItem("token", response.data.access_token);
      login();
      navigate("/dashboard");
    } catch (err) {
      const error = err as IErorr;
      setLoginError(error.response.data.detail);
    }
  };

  return (
    <div className="block rounded-lg bg-white p-6 shadow-lg sm:mx-auto sm:max-w-lg">
      <UserSVG clsName="mb-6 h-24 w-24 m-auto stroke-1 stroke-indigo-600" />

      <p className="font-gray-800 mb-6 text-center text-xl font-bold">
        Sign in to your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "This should be valid email address.",
              },
            })}
            type="text"
            autoComplete="email"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Enter email"
          />
          <p className="mb-6 text-red-500">{errors.email?.message}</p>
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters.",
              },
            })}
            type="password"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Password"
          />
          <p className="mb-6 text-red-500">{errors.password?.message}</p>
        </div>

        {loginError !== "" && <p className="mb-6 text-red-500">{loginError}</p>}

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
          to={APP_ROUTES.REGISTER}
          className="text-blue-600 transition duration-200 ease-in-out hover:text-blue-700"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

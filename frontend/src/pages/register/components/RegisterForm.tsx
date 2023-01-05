import { UserSVG } from "../../../shared";
import { Link, useNavigate } from "react-router-dom";
import APP_ROUTES from "../../../core/routes";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterProps } from "../models";
import { useRegister } from "../api";

const RegisterForm = () => {
  const navigation = useNavigate();
  const mutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IRegisterProps>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<IRegisterProps> = async (data) => {
    try {
      await mutation.mutateAsync({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      });
      navigation(APP_ROUTES.LOGIN);
    } catch (err) {
      /* empty */
    }
  };

  return (
    <div className="block rounded-lg bg-white p-6 shadow-lg sm:mx-auto sm:max-w-lg">
      <UserSVG clsName="mb-6 h-24 w-24 m-auto stroke-1 stroke-indigo-600" />

      <p className="font-gray-800 mb-6 text-center text-xl font-bold">
        Sign up to create account
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label
            htmlFor="firstName"
            className="form-label mb-2 inline-block text-gray-700"
          >
            First Name
          </label>
        </div>
        <div>
          <input
            id="firstName"
            {...register("firstName", {
              required: "First Name is required.",
              minLength: {
                value: 3,
                message: "First Name have to be at least 3 characters.",
              },
            })}
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Enter First Name"
          />
          <p className="mb-6 text-red-500">{errors.firstName?.message}</p>
        </div>

        <div className="form-group">
          <label
            htmlFor="lastName"
            className="form-label mb-2 inline-block text-gray-700"
          >
            Last Name
          </label>
        </div>
        <div>
          <input
            id="lastName"
            {...register("lastName", {
              required: "Last Name is required.",
              minLength: {
                value: 3,
                message: "Last Name have to be at least 3 characters",
              },
            })}
            type="text"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Enter Last Name"
          />
          <p className="mb-6 text-red-500">{errors.lastName?.message}</p>
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
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "This should be valid email address.",
              },
            })}
            type="text"
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

        <div className="form-group">
          <label
            htmlFor="confirmPassword"
            className="form-label mb-2 inline-block text-gray-700"
          >
            Confirm Password
          </label>
        </div>
        <div>
          <input
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm Password is required.",
              minLength: {
                value: 8,
                message: "Confirm password must have at least 8 characters.",
              },
              validate: (val: string) => {
                if (watch("password") !== val) {
                  return "Confirm password must match password.";
                }
              },
            })}
            type="password"
            className="form-control font normal m-0 mb-1 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base text-gray-700 transition ease-in-out focus:text-gray-700"
            placeholder="Confirm password"
          />
          <p className="mb-6 text-red-500">{errors.confirmPassword?.message}</p>
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

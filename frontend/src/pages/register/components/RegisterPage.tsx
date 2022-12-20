import { RegisterForm } from "./index";

const RegisterPage = () => {
  return (
    <div>
      <div className="pt-12 text-center">
        <h2 className="mb-6 text-5xl font-bold text-indigo-500">
          Get started today
        </h2>
        <p className="mb-6 font-medium text-gray-500">
          Sign up and start managing your personal online psychological cabinet.
        </p>
      </div>

      <div className="mb-20 pt-10">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;

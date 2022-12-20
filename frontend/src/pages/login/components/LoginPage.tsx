import { LoginForm } from "./index";

const LoginPage = () => {
  return (
    <div>
      <div className="pt-12 text-center">
        <h2 className="mb-6 text-5xl font-bold text-indigo-500">
          Welcome back
        </h2>
        <p className="mb-6  font-medium text-gray-500">
          Log in and start managing your personal online psychological cabinet.
        </p>
      </div>

      <div className="mb-20 pt-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

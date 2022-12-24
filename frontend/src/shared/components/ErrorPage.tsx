import { Header, Footer } from "./index";
import { useRouteError } from "react-router-dom";

interface IError {
  statusText: string;
  message: string;
}

const ErrorPage = () => {
  const error = useRouteError() as IError;

  return (
    <div className="min-h-screen bg-indigo-50">
      <Header />
      <article className="flex h-[calc(100vh-300px)] overflow-auto">
        <div className="m-auto text-center">
          <h2 className="mb-6 text-5xl font-bold text-indigo-500">Oops!</h2>
          <p className="mb-6  font-medium text-gray-500">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="mb-6  font-medium text-gray-500">
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default ErrorPage;

import { Psychology } from "../../assets";

const Header = () => {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
      <header className="flex items-center justify-between">
        <a href="/">
          <img src={Psychology} alt="" style={{ width: 120, height: 79 }} />
        </a>

        <nav>
          <ul className="md:flex md:items-center md:gap-6">
            <li>
              <a
                href="/"
                className="block rounded bg-transparent py-2 pl-3 pr-4 text-gray-700 transition hover:text-gray-700 hover:text-blue-700"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block rounded bg-transparent py-2 pl-3 pr-4 text-gray-700 transition hover:text-gray-700 hover:text-blue-700"
              >
                Functionalities
              </a>
            </li>
            <li>
              <a
                href="/"
                className="block rounded bg-transparent py-2 pl-3 pr-4 text-gray-700 transition hover:text-gray-700 hover:text-blue-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <a
            href="/"
            className="mr-2 mb-2 mt-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Login
          </a>
          <a
            href="/"
            className="mr-2 mb-2 mt-2 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-purple-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            Register
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;

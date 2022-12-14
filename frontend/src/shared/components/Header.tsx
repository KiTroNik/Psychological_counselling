import { Psychology } from "../../assets";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="md:flex">
          <li><a href="/"><img src={Psychology as string} alt="" style={{ width: 120, height: 79 }} /></a></li>
          <li><a href="/" className="text-base">Home</a></li>
          <li><a href="/">Functionalities</a></li>
          <li><a href="/">Contact</a></li>
          <li><a href="/">Login</a></li>
          <li><a href="/">Register</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

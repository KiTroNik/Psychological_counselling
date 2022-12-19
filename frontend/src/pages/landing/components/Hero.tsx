import { HeroImage } from "../../../assets";

const Hero = () => {
  return (
    <div className="p-10">
      <article className="mx-auto max-w-screen-2xl sm:mx-auto md:flex md:items-center md:justify-around">
        <div className="max-w-fill m-0 rounded-lg shadow-2xl shadow-indigo-500/50 md:order-2">
          <img
            src={HeroImage}
            className="rounded-lg"
            alt=""
            style={{ width: 405, height: 500 }}
          />
        </div>

        <div className="mt-12 text-center">
          <h1
            data-testid="heading"
            className="mb-12 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl"
          >
            Your personal online <br />
            <span className="text-indigo-500">psychological cabinet.</span>
          </h1>
          <p className="mb-12 text-lg text-gray-500">
            The app which helps you to run your cabinet without stress. <br />
            It is simple, secure and intuitive
          </p>
          <a
            href="/"
            className="inline-block rounded-lg bg-indigo-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-2xl transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-2xl focus:bg-indigo-700 focus:shadow-2xl focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-2xl"
          >
            Get started
          </a>
        </div>
      </article>
    </div>
  );
};

export default Hero;

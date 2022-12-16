import { HeroImage } from "../../../assets";

const Hero = () => {
  return (
    <div className="bg-indigo-50 p-10">
      <article className="max-w-screen-2xl md:flex mx-auto md:items-center md:justify-around sm:mx-auto">
        <div className="m-0 md:order-2 shadow-2xl shadow-indigo-500/50 rounded-lg max-w-fill">
          <img src={HeroImage} className="rounded-lg" alt="" style={{ width: 405, height: 500 }} />
        </div>

        <div className="text-center mt-12">
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
            Your personal online <br />
            <span className="text-indigo-500">psychological cabinet.</span>
          </h1>
          <p className="mb-12 text-gray-500 text-lg">
            The app which helps you to run your cabinet without stress. <br />
            It is simple, secure and intuitive
          </p>
          <a href="/" className="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-xs leading-tight uppercase rounded-lg shadow-2xl hover:bg-indigo-700 hover:shadow-2xl focus:bg-indigo-700 focus:shadow-2xl focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-2xl transition duration-150 ease-in-out">Get started</a>
        </div>
      </article>
    </div>
  )
}

export default Hero;

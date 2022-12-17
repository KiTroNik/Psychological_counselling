import { ClientsSVG, EmailSVG, CalendarSVG, PenSVG, FeatureCard } from "./index";

const Features = () => {
  return (
    <article className="bg-indigo-50 p-10">
      <div className="max-w-screen-2xl text-center m-auto md:grid md:grid-cols-17 md:grid-rows-3">
        <div className="mb-3 pb-24 bg-indigo-900 shadow-2xl rounded-lg p-12 md:col-start-1 md:col-end-18 md:row-start-1 md:row-end-3">
          <h2
            className="mb-3 text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800">See
            our functionalities</h2>
          <p className="text-lg text-gray-400">And learn how you could use application to <br />
            simplify your everyday work.</p>
        </div>

        <div className="mb-3 rounded-lg bg-indigo-50 container max-w-sm m-auto md:col-start-2 md:col-end-5 md:row-start-2 md:row-end-4">
          <FeatureCard Image={ClientsSVG} title="Manage clients" content="Create, edit and delete your clients" />
        </div>

        <div className="mb-3 rounded-lg bg-indigo-50 container max-w-sm m-auto md:col-start-6 md:col-end-9 md:row-start-2 md:row-end-4">
          <FeatureCard Image={CalendarSVG} title="Manage calendar"
                       content="Book or cancel your appointments with clients." />
        </div>

        <div className="mb-3 rounded-lg bg-indigo-50 container max-w-sm m-auto md:col-start-10 md:col-end-13 md:row-start-2 md:row-end-4">
          <FeatureCard Image={PenSVG} title="Make notes"
                       content="Make notes about meetings with clients and be up to date with the therapy." />
        </div>

        <div className="mb-3 rounded-lg bg-indigo-50 container max-w-sm m-auto md:col-start-14 md:col-end-17 md:row-start-2 md:row-end-4">
          <FeatureCard Image={EmailSVG} title="Email notifications"
                       content="Send automatically emails to your clients to remind them about meeting." />
        </div>
      </div>
    </article>
  );
};

export default Features;

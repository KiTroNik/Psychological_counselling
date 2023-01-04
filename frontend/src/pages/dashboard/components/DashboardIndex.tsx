const DashboardIndex = () => {
  return (
    <div className="p-10">
      <article className="mx-auto max-w-screen-2xl sm:mx-auto md:flex md:items-center md:justify-around">
        <div className="mt-12 text-center">
          <h1
            data-testid="heading"
            className="mb-12 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl"
          >
            Welcome to
            <span className="text-blue-700"> MyCabinet</span> app.
          </h1>
          <p className="mb-12 text-lg text-gray-500">
            Start managing your clients and appointments from sidebar on the
            left.
          </p>
        </div>
      </article>
    </div>
  );
};

export default DashboardIndex;

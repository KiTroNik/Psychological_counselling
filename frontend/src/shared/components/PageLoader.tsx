const PageLoader = () => {
  return (
    <div className="pt-12 text-center">
      <div className="flex items-center justify-center">
        <div
          className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
          role="status"
        ></div>
      </div>
    </div>
  );
};

export default PageLoader;

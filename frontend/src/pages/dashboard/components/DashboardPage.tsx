import { Sidebar } from "../../../shared";
import { Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-none xl:w-[300px]">
        <Sidebar />
      </div>
      <main className="min-w-0 flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardPage;

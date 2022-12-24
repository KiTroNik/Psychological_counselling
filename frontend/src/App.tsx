import { Header, Footer } from "./shared";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;

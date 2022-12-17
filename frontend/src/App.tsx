import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import APP_ROUTES from "./core/routes";
import { Header, Footer } from "./shared";

const App = () => {
  return (
    <div className="min-h-screen bg-indigo-50">
      <Header />
      <Routes>
        <Route path={APP_ROUTES.LANDING} element={<LandingPage />} />
        <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

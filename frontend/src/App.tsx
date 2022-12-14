import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { LandingPage } from "./pages/landing";
import APP_ROUTES from "./core/routes";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={APP_ROUTES.LANDING} element={<LandingPage />}/>
      </Routes>
    </div>
  );
};

export default App;

import { Header } from "../../../shared";
import { Footer } from "../../../shared";
import { Features, Hero } from "./index";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;

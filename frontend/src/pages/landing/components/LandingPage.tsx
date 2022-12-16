import { Header } from "../../../shared";
import Hero from "./Hero";
import { Footer } from "../../../shared";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header/>
      <Hero />
      <Footer />
    </div>
  );
};

export default LandingPage

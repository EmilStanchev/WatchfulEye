import FeaturesSection from "../components/UI/AboutPage/FeaturesSection";
import TestimonialsSection from "../components/UI/AboutPage/TestimonialsSection";
import WhyChooseUs from "../components/UI/AboutPage/WhyChooseUs";
import Metrics from "../components/UI/AboutPage/Metrics";
import AddIncidentTimeline from "../components/UI/AboutPage/AddIncidentTimeline";
import HeroSection from "../components/UI/AboutPage/HeroSection";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-black text-white w-full h-full">
      <HeroSection />

      <FeaturesSection />
      <WhyChooseUs />
      <Metrics />
      <AddIncidentTimeline />
      <TestimonialsSection />

      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-300 mb-8">
            Join the movement to create a safer, more connected neighborhood.
          </p>
          <Link
            to={"/login"}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium text-lg hover:bg-blue-600 transition duration-200"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      <footer className="bg-black py-10">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Neighborhood Security Watch. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;

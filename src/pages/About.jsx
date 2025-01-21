import { Link } from "react-router-dom";
import FeaturesSection from "../components/UI/AboutPage/FeaturesSection";
import TestimonialsSection from "../components/UI/AboutPage/TestimonialsSection";

/* eslint-disable react/no-unescaped-entities */
const About = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto flex flex-col justify-center items-center h-full text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6">
            Your Neighborhood’s{" "}
            <span className="text-blue-500">Safety Hub</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Stay informed, report incidents, and foster a safer community with
            ease.
          </p>
          <div className="space-x-4">
            <Link
              to={"/login"}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium text-lg hover:bg-blue-600 transition duration-200"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-8 py-3 cursor-pointer bg-gray-800 text-gray-300 rounded-lg font-medium text-lg hover:bg-gray-700 transition duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-300 mb-8">
            Join the movement to create a safer, more connected neighborhood.
          </p>
          <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium text-lg hover:bg-blue-600 transition duration-200">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10">
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

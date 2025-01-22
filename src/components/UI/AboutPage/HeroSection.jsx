import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative bg-cover bg-center h-screen w-full"
      style={{ backgroundImage: `url($'{}')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="container mx-auto flex flex-col justify-center items-center h-full text-center relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6">
          Your Neighborhood’s <span className="text-blue-500">Safety Hub</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-lg sm:max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
          Stay informed, report incidents, and foster a safer community with
          ease. <br className="hidden sm:block" />
          Warn your neighbors and save them from disaster.
        </p>

        {/* Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
          <Link
            to="/login"
            className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-500 text-white rounded-md font-medium text-sm sm:text-lg hover:bg-blue-600 transition duration-200"
          >
            Get Started
          </Link>
          <a
            href="#features"
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gray-800 text-gray-300 rounded-md font-medium text-sm sm:text-lg hover:bg-gray-700 transition duration-200"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

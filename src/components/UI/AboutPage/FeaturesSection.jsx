import {
  FaBell,
  FaEdit,
  FaHandshake,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaBolt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBell />,
    title: "Neighborhood Alerts",
    description:
      "Subscribe to neighborhoods of your choice and get instant updates on reported incidents and safety tips.",
    color: "from-blue-500 via-blue-600 to-blue-700",
    bgColor: "bg-blue-600",
  },
  {
    icon: <FaEdit />,
    title: "Seamless Reporting",
    description:
      "Log incidents effortlessly with a few clicks, add photos, and provide details to ensure accuracy.",
    color: "from-green-500 via-green-600 to-green-700",
    bgColor: "bg-green-600",
  },
  {
    icon: <FaHandshake />,
    title: "Community Connection",
    description:
      "Collaborate with neighbors to create a safer environment through shared updates and safety tips.",
    color: "from-yellow-500 via-yellow-600 to-yellow-700",
    bgColor: "bg-yellow-600",
  },
  {
    icon: <FaShieldAlt />,
    title: "Advanced Security",
    description:
      "Your data is protected with top-notch security measures, ensuring a safe and private experience.",
    color: "from-purple-500 via-purple-600 to-purple-700",
    bgColor: "bg-purple-600",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Map Integration",
    description:
      "View reported incidents on a live map to identify patterns and trends in your area.",
    color: "from-red-500 via-red-600 to-red-700",
    bgColor: "bg-red-600",
  },
  {
    icon: <FaBolt />,
    title: "Lightning Fast",
    description:
      "Enjoy a seamless and fast experience with our optimized platform for all devices.",
    color: "from-teal-500 via-teal-600 to-teal-700",
    bgColor: "bg-teal-600",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-black to-gray-400"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-white mb-12">
          Built for Your <span className="text-blue-500">Peace of Mind</span>
        </h2>
        <div className="relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-500"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
            >
              <div
                className={`absolute inset-0 w-full h-full bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition duration-300`}
              ></div>
              <div className="p-8">
                <div
                  className={`flex items-center justify-center w-16 h-16 ${feature.bgColor} text-white rounded-full mb-6`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

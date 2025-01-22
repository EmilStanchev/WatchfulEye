import FeatureCard from "../cards/FeatureCard";

const features = [
  {
    title: "Real-Time Incident Tracking",
    description:
      "Stay informed with real-time updates on incidents in your area. Never miss important information about your neighborhood's safety.",
    icon: "fas fa-map-marker-alt", // Replace with a React Icon or FontAwesome class
  },
  {
    title: "Easy Incident Reporting",
    description:
      "Quickly and easily report suspicious activities or concerns directly through our user-friendly platform.",
    icon: "fas fa-bullhorn", // Replace with a React Icon or FontAwesome class
  },
  {
    title: "Community Engagement",
    description:
      "Connect with your neighbors and collaborate to make your community a safer place for everyone.",
    icon: "fas fa-users", // Replace with a React Icon or FontAwesome class
  },
  {
    title: "Secure and Reliable",
    description:
      "Your data is encrypted and secured, ensuring that your reports and personal information remain private.",
    icon: "fas fa-lock", // Replace with a React Icon or FontAwesome class
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="whyChooseUs"
      className="py-20 bg-gradient-to-b from-gray-400 to-gray-100"
    >
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12">
          Why <span className="text-blue-500">Choose Us?</span>
        </h2>
        <p className="text-lg text-gray-600 mb-16">
          Our platform is designed to empower communities with cutting-edge
          technology, seamless usability, and a commitment to safety and
          collaboration.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

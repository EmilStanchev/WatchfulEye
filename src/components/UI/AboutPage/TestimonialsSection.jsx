import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Emily Johnson",
    title: "Local Resident",
    image: "https://via.placeholder.com/150", // Replace with a real image URL
    text: "This platform has completely changed the way our neighborhood communicates. It's efficient, reliable, and has made us feel safer!",
  },
  {
    name: "Michael Brown",
    title: "Community Leader",
    image: "https://via.placeholder.com/150", // Replace with a real image URL
    text: "The incident reporting system is a game-changer. It’s so easy to use, and now we’re all more aware of what’s happening around us.",
  },
  {
    name: "Sophia Martinez",
    title: "Safety Advocate",
    image: "https://via.placeholder.com/150", // Replace with a real image URL
    text: "The live map and real-time alerts have been invaluable. I can’t imagine going back to the old ways of staying informed.",
  },
];

const TestimonialsSection = () => (
  <div
    id="testimonials"
    className="relative py-2 text-white overflow-hidden  bg-black"
  >
    <div className="absolute inset-0 bg-pattern opacity-20"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center mb-12">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  </div>
);

export default TestimonialsSection;

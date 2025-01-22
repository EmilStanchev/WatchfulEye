/* eslint-disable react/prop-types */

const TestimonialCard = ({ testimonial }) => (
  <div
    key={testimonial?.name}
    className="relative bg-white rounded-lg shadow-lg p-8 m-4 max-w-md flex flex-col items-center transform transition duration-500 hover:scale-105 hover:shadow-2xl"
  >
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-20 h-20 rounded-full border-4 border-white"
      />
    </div>
    <h3 className="mt-12 text-2xl font-semibold text-gray-800">
      {testimonial.name}
    </h3>
    <p className="text-sm text-gray-500">{testimonial.title}</p>
    <p className="mt-4 text-gray-600 text-center">{testimonial.text}</p>
    <div className="flex mt-4">
      {[...Array(5)].map((_, index) => (
        <svg
          key={testimonial?.title + index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          color="orange"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  </div>
);

export default TestimonialCard;

/* eslint-disable react/prop-types */
import { FaTimesCircle } from "react-icons/fa";

const ImageUploader = ({ imageUrls, onAddImage, onRemoveImage }) => {
  const handleImageUrlChange = (e) => {
    const value = e.target.value.trim();
    if (value) {
      onAddImage(value);
      e.target.value = ""; // Clear input
    }
  };

  return (
    <div>
      <label
        htmlFor="images"
        className="block text-sm font-medium text-gray-700"
      >
        Image URLs
      </label>
      <input
        type="text"
        id="images"
        placeholder="Enter Image URL"
        onBlur={handleImageUrlChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
      <p className="text-sm text-gray-500 mt-1">
        Enter image URLs, one per line.
      </p>
      <ul className="list-disc pl-5">
        {imageUrls.map((url, index) => (
          <li key={index} className="flex justify-between items-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 truncate"
            >
              {url}
            </a>
            <button
              type="button"
              onClick={() => onRemoveImage(url)}
              className="ml-2 text-red-500"
            >
              <FaTimesCircle />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageUploader;

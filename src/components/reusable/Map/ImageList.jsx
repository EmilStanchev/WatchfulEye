import { FaTimesCircle } from "react-icons/fa";

/* eslint-disable react/prop-types */
export const ImageList = ({ imageUrls, removeImageUrl }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-700">Added Images:</h3>
    <ul className="list-none space-y-2 mt-2">
      {imageUrls.length > 0 ? (
        imageUrls.map((url, index) => (
          <li key={index} className="flex justify-between items-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline truncate max-w-[90%]"
            >
              {url}
            </a>
            <FaTimesCircle
              onClick={() => removeImageUrl(url)}
              className="cursor-pointer text-red-600 hover:text-red-800"
            />
          </li>
        ))
      ) : (
        <p className="text-gray-500">No images added yet.</p>
      )}
    </ul>
  </div>
);

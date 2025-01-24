/* eslint-disable react/prop-types */
const AddressField = ({ address }) => (
  <div>
    <label className="block text-gray-700 text-sm font-medium mb-2">
      Address
    </label>
    <input
      type="text"
      value={address}
      readOnly
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default AddressField;

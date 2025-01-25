export const fetchAddress = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    console.log(data.display_name, " from service");

    return data.display_name || "Unknown Address";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching address";
  }
};

export const fetchNeighborhood = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();

    const address = data.address;
    let neighborhood =
      address.neighbourhood || address.suburb || address.city_district;

    if (!neighborhood) {
      neighborhood = "Unknown Neighborhood";
    }
    console.log(neighborhood, " from service");

    return neighborhood;
  } catch (error) {
    console.error("Error fetching neighborhood:", error);
    return "Error fetching neighborhood";
  }
};

export const fetchLocationData = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    const address = data.display_name;
    const neighborhood =
      data.address.neighbourhood ||
      data.address.suburb ||
      data.address.city_district ||
      "Unknown Neighborhood";

    return { address, neighborhood };
  } catch (error) {
    console.error("Error fetching location data:", error);
    return { address: "Error fetching address", neighborhood: "Unknown" };
  }
};

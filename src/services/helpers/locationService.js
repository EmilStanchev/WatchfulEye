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

    // Extract neighborhood and city
    let neighborhood =
      address?.neighbourhood || address?.suburb || address.city_district;
    const city = address.city || address.town || address.village;

    if (!neighborhood) {
      neighborhood = "Unknown Neighborhood";
    }

    if (!city) {
      return neighborhood; // Return just the neighborhood if the city is unavailable
    }

    // Format neighborhood and city
    const formattedAddress = `${neighborhood}, ${city}`;
    console.log(formattedAddress, "from service");

    return formattedAddress;
  } catch (error) {
    console.error("Error fetching neighborhood:", error);
    return "Error fetching neighborhood";
  }
};

const getDayOfWeek = (timestamp) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(timestamp);
  return daysOfWeek[date.getUTCDay()];
};

export const calculatePeakReportingDay = (timestamps) => {
  const dayCounts = {};

  timestamps.forEach((timestamp) => {
    const day = getDayOfWeek(timestamp);
    dayCounts[day] = (dayCounts[day] || 0) + 1;
  });

  let peakDay = "";
  let maxCount = 0;

  for (const [day, count] of Object.entries(dayCounts)) {
    if (count > maxCount) {
      maxCount = count;
      peakDay = day;
    }
  }

  return peakDay || "No Data"; // Return "No Data" if there are no timestamps
};

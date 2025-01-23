/* eslint-disable react/prop-types */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const IncidentTrendChart = ({ incidents }) => {
  // Process incidents into trends (group by month)
  const processIncidents = (incidents) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const groupedData = Array(12).fill(0); // Initialize array for 12 months

    incidents.forEach((incident) => {
      const date = new Date(incident.createdAt);
      const monthIndex = date.getMonth(); // 0-indexed month
      groupedData[monthIndex]++;
    });

    return {
      labels: months, // Month names
      data: groupedData, // Incident counts for each month
    };
  };

  const { labels, data } = processIncidents(incidents);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Incidents Over Time",
        data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows flexibility for height/width
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
          },
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          color: "#555",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#333",
          font: {
            size: 10,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Incidents",
          color: "#555",
          font: {
            size: 14,
          },
        },
        ticks: {
          color: "#333",
          font: {
            size: 10,
          },
          stepSize: 1, // Optional: Ensures better readability for low values
          beginAtZero: true,
        },
        grid: {
          color: "rgba(200, 200, 200, 0.5)", // Lighter gridlines
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md max-w-sm mx-auto">
      <h3 className="text-center text-lg font-semibold text-gray-700 mb-4">
        Incident Trends
      </h3>
      <div style={{ height: "200px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default IncidentTrendChart;

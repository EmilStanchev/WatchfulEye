import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaPen, FaUpload, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";

const steps = [
  {
    title: "Step 1: Fill Incident Details",
    description:
      "Provide details like the title, description, and category of the incident.",
    icon: <FaPen />,
  },
  {
    title: "Step 2: Add Location",
    description: "Mark the location of the incident using the interactive map.",
    icon: <FaMapMarkerAlt />,
  },
  {
    title: "Step 3: Upload Photos (Optional)",
    description: "Attach images or files to give more context to the incident.",
    icon: <FaUpload />,
  },
  {
    title: "Step 4: Submit Incident",
    description:
      "Review the information and click 'Submit' to report the incident.",
    icon: <FaCheckCircle />,
  },
];

export default function AddIncidentTimeline() {
  return (
    <section
      id="timeline"
      className="py-16 bg-gradient-to-b from-gray-400 to-black "
    >
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          How to Add a New <span className="text-blue-500">Incident</span>
        </h2>
        <VerticalTimeline>
          {steps.map((step, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "linear-gradient(to right, #1e3a8a, #3b82f6)",
                color: "#fff",
              }}
              contentArrowStyle={{ borderRight: "7px solid #1e3a8a" }}
              iconStyle={{
                background: "#3b82f6",
                color: "#fff",
              }}
              icon={step.icon}
            >
              <h3 className="vertical-timeline-element-title text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p>{step.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}

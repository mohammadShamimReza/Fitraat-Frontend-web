import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

interface Props {
  day: string;
  loading: boolean;
  onNavigate: (direction: "next" | "prev") => void;
}

export default function ChildProtectionNavigation({
  day,
  loading,
  onNavigate,
}: Props) {
  return (
    <div className="flex justify-between mt-8">
      <button
        className={`px-4 py-2 rounded text-white ${
          day === "1"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-600 hover:bg-gray-700"
        }`}
        disabled={day === "1" || loading}
        onClick={() => onNavigate("prev")}
      >
        <ArrowLeftOutlined className="mr-2" /> Previous
      </button>

      <button
        className={`px-4 py-2 rounded text-white ${
          parseInt(day) >= 40 || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-600 hover:bg-gray-700"
        }`}
        disabled={parseInt(day) >= 40 || loading}
        onClick={() => onNavigate("next")}
      >
        Next <ArrowRightOutlined className="ml-2" />
      </button>
    </div>
  );
}

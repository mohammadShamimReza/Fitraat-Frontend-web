import DayCompletion from "../DayCompletion";
import UserActivityPieChart from "../UserActivity";

export default function ProRecovery({
  paid,
  compliteDay,
  daysLeft,
  progressData,
}: {
  paid: string;
  compliteDay: number;
  daysLeft: number;
  progressData: {
    day: number;
    completed: boolean;
  }[];
}) {
  return (
    <div>
      {" "}
      {/* Pie Chart Section */}
      <div className="relative w-full sm:w-auto flex justify-center items-center">
        {/* Pie Chart (always rendered, but blurred if not Pro) */}
        <div
          className={`${
            paid === "Complete" ? "" : "blur-sm pointer-events-none"
          }`}
        >
          <UserActivityPieChart completed={compliteDay} total={daysLeft} />
        </div>

        {/* Overlay message if not Pro */}
        {paid !== "Complete" && (
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-white/40 backdrop-blur-sm rounded-lg">
            <p className="text-gray-800 font-semibold mb-3 text-sm sm:text-base">
              Upgrade to <span className="text-blue-700 font-bold">Pro</span> to
              view your activity details.
            </p>
            <button
              onClick={() => (window.location.href = "/payment")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition-all duration-300 shadow-md"
            >
              Go to Payment
            </button>
          </div>
        )}
      </div>
      <DayCompletion
        compliteDay={compliteDay}
        paid={paid}
        progressData={progressData}
      />
    </div>
  );
}

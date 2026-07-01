import DayCompletion from "../DayCompletion";
import UserActivityPieChart from "../UserActivity";

export default function ProRecovery({
  compliteDay,
  daysLeft,
  progressData,
}: {
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
        <div>
          <UserActivityPieChart completed={compliteDay} total={daysLeft} />
        </div>
      </div>
      <DayCompletion
        compliteDay={compliteDay}
        progressData={progressData}
      />
    </div>
  );
}


type progressData= {
  day: number;
  completed: boolean;
}[];

export default function DayCompletion({
  compliteDay,
  progressData,
}: {
  compliteDay: number;
  progressData: progressData;
}) {
  return (
    <>
      <div className="relative bg-white border rounded-lg p-6 mt-8">
        <h1 className="text-3xl font-semibold text-center mb-4 underline">
          Remaining: <span className="text-blue-500">{40 - compliteDay}</span>{" "}
          Days
        </h1>

        <div
          className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-1 transition-all duration-300"
        >
          {progressData.map((data, index) => (
            <div
              key={index}
              className={`p-2 text-center border border-gray-400 rounded-md ${
                data.completed
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <p className="font-semibold">{data.day}</p>
              <p className="text-xs mt-1">
                {data.completed ? "Completed" : "Incomplete"}
              </p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

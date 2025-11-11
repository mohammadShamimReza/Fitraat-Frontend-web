
type progressData= {
  day: number;
  completed: boolean;
}[];

export default function DayCompletion({
  compliteDay,
  paid,
  progressData,
}: {
  compliteDay: number;
  paid: string;
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
          className={`relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-1 transition-all duration-300 ${
            paid ? "" : "blur-sm pointer-events-none select-none"
          }`}
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

        {/* Overlay for non-Pro users */}
        {paid != "Complete" && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/60 backdrop-blur-sm rounded-lg">
            <p className="text-gray-800 font-semibold mb-3 text-center text-sm sm:text-base">
              Upgrade to <span className="text-blue-600 font-bold">Pro</span> to
              view your progress details.
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
    </>
  );
}

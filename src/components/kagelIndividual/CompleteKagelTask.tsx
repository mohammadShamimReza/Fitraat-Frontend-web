const CompletedKagelTask = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="p-8 bg-white border rounded-2xl shadow-lg max-w-lg w-full text-center">
        <h1 className="text-3xl font-semibold mb-4 text-purple-700">
          🎉 Congratulations!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          You’ve successfully completed today’s <b>Kegel Exercise</b> routine!
          Keep practicing daily to strengthen your focus and control.
        </p>

        <div className="flex flex-col items-center space-y-3">
          <p className="text-md text-gray-600">
            Great progress! Your consistency is your biggest strength 💪
          </p>
        </div>
      </div>
    </div>
  );
};
export default CompletedKagelTask;
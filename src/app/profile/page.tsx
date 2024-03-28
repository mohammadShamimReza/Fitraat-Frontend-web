import "tailwindcss/tailwind.css";

function ProfilePage() {
  const user = {
    name: "John Doe",
    age: 30,
    dailyPerformance: [80, 90, 70, 85, 95, 75, 80],
    completedDays: 45, // Assume user has completed 45 days
    location: "New York, USA",
    email: "johndoe@example.com",
    bio: "Passionate about coding and technology.",
  };

  // Dummy data for the past 120 days
  const days = Array.from({ length: 120 }, (_, i) => i + 1);
  const progressData = days.map((day) => ({
    day,
    completed: day <= user.completedDays,
  }));

  const containerClasses = "container mx-auto py-8 px-4";
  const cardClasses = "bg-white shadow-lg rounded-lg p-6";
  const chartContainerClasses = "mt-8";

  return (
    <div className={containerClasses}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Profile Info */}
        <div className={cardClasses}>
          <h1 className="text-3xl font-semibold text-center mb-4">Profile</h1>
          <p className="text-xl font-semibold">Name: {user.name}</p>
          <p className="text-xl font-semibold">Age: {user.age}</p>
          <p className="text-xl font-semibold">Location: {user.location}</p>
          <p className="text-xl font-semibold">Email: {user.email}</p>
          {/* Additional Profile Info */}
          <p className="text-xl font-semibold mt-4">Bio:</p>
          <p className="text-lg">{user.bio}</p>
        </div>

        {/* Additional Information */}
        <div className={cardClasses}>
          <h1 className="text-3xl font-semibold text-center mb-4">
            Additional Information
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Add any additional information here */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Education</h2>
              <p>Bachelor&apos;s Degree in Computer Science</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Experience</h2>
              <p>5 years of experience in web development</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className={`${containerClasses} mt-8`}>
        <h1 className="text-3xl font-semibold text-center mb-4">Contact</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <form>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-lg font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter your message here..."
              ></textarea>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Recovery Features */}
      <div className={`${containerClasses} mt-8`}>
        <h1 className="text-3xl font-semibold text-center mb-4">
          Recovery Features
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Add recovery features here */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Daily Progress Steps</h2>
            <p>Track your daily progress steps towards recovery.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Inspiring Content</h2>
            <p>
              Access inspiring videos and articles to motivate you on your
              journey.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Community Support</h2>
            <p>Connect with others in a supportive community environment.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Expert Guidance</h2>
            <p>
              Get professional support from licensed mental health
              professionals.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Stay Motivated</h2>
            <p>Stay motivated with gamification elements and rewards.</p>
          </div>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className={`${chartContainerClasses} mt-8`}>
        <h1 className="text-3xl font-semibold text-center mb-4">
          Remaining Days
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-1">
          {progressData.map((data, index) => (
            <div
              key={index}
              className={`p-2 text-center border border-gray-400 ${
                data.completed
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-gray-300"
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
    </div>
  );
}

export default ProfilePage;

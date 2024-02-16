import React from "react";

function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        How Detox-Dopamine Works
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">1. Newsletter for Users</h2>
        <p className="text-lg mb-4">
          Stay informed and inspired with our newsletter. We deliver curated
          content directly to your inbox, including:
        </p>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            Blogs: Thought-provoking articles on addiction recovery and digital
            well-being.
          </li>
          <li className="mb-2">
            Updates: Stay up-to-date with the latest features and improvements.
          </li>
          <li className="mb-2">
            News: Relevant news and updates in the field of mental health and
            technology.
          </li>
          <li className="mb-2">
            Feature Updates: Learn about new features and enhancements to the
            app.
          </li>
          <li className="mb-2">
            Marketing: Exclusive offers and promotions to support your journey.
          </li>
        </ul>
      </div>

      {/* Daily Tasks Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">2. Daily Tasks</h2>
        <p className="text-lg mb-4">
          Engage in daily tasks designed to foster personal growth and recovery.
          These include:
        </p>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            Watch Videos: Educational videos on addiction recovery and digital
            well-being.
          </li>
          <li className="mb-2">
            Take Notes: Reflect on your progress and thoughts with short
            note-taking exercises.
          </li>
          <li className="mb-2">
            Quizzes: Reinforce learning and test your knowledge with engaging
            quizzes.
          </li>
          <li className="mb-2">
            Earn Rewards: Stay committed and earn rewards for completing tasks.
          </li>
          <li className="mb-2">
            Suggested Blogs: Receive personalized suggestions for blog articles
            related to recovery and mindfulness.
          </li>
        </ul>
      </div>

      {/* Track Daily Activities Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">3. Track Daily Activities</h2>
        <p className="text-lg mb-4">
          Monitor your progress and stay motivated with our daily activity
          tracking feature:
        </p>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            Progress Tracking: Visualize your daily activities and progress with
            intuitive progress lines.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Page;
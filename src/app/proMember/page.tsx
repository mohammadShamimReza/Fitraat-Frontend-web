const MembershipCard = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:p-3 md:p-3 lg:p-0">
        {/* Freemium Membership Card */}
        <div className="bg-white overflow-hidden  rounded-lg shadow-md">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold leading-6 text-gray-900">
              Freemium Membership
            </h2>
            <ul className="mt-2 text-base text-gray-500">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Access to basic features
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Limited access to premium content
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Basic customer support
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Access to community forum
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Ability to save preferences
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Access to basic analytics
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Ability to connect with social media
              </li>
            </ul>
          </div>
          <div className="bg-gray-200 px-4 py-4 sm:px-6">
            <button className="w-full rounded-md border border-transparent px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Pro Membership Card */}
        <div className="bg-white overflow-hidden shadow-md rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-semibold leading-6 text-gray-900">
              Pro Membership
            </h2>
            <ul className="mt-2 text-base text-gray-500">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Access to all features
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Unlimited access to premium content
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Priority customer support
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Advanced analytics dashboard
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Personalized recommendations
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Exclusive webinars and workshops
              </li>
              <li className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 mr-2 fill-current text-green-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Customizable dashboard layout
              </li>
            </ul>
          </div>
          <div className="bg-gray-800 px-4 py-4 sm:px-6">
            <button className="w-full rounded-md border border-transparent px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;

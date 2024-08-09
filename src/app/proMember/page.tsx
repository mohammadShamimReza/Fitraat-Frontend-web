"use client";
import Link from "next/link";

const MembershipCard = () => {
  return (
    <div className=" min-h-screen">
      <div className="">
        <div className=" p-5">
          <p className="text-center text-4xl font-bold text-gray-700 underline">
            Become <span className="text-red-600">premium</span> member
          </p>
          {/* <p className="mt-5 max-w-5xl p-5 mx-auto">
            &quot;We suggest not buying the premium membership right away. We
            offer a 40-day free trial of our app without requiring any login. We
            believe this 40-day trial is sufficient for most people. However, if
            you still lack confidence after this trial period, you can consider
            purchasing our premium membership. It&apos;s designed to help you
            maintain consistency over a 120-day period.&quot;{" "}
            <span className="text-lg font-bold">
              {" "}
              Let&apos;s build <span className="text-red-600">
                {" "}
                spartan
              </span>{" "}
              habit and become
              <span className="text-red-600"> unbeatable</span>.
            </span>
          </p> */}
        </div>
      </div>
      <div className="flex justify-center items-center  ">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:p-3 md:p-3 lg:p-0">
          {/* Freemium Membership Card */}
          <div className="bg-white overflow-hidden   shadow-md rounded-xl border-2 flex justify-between flex-col">
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
                  Limited access to content
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
                <li
                  className="flex items-center mt-2 line-through
"
                >
                  <svg
                    className="w-5 h-5 mr-2 fill-current text-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Customizable dashboard layout
                </li>
                <li
                  className="flex items-center mt-2 line-through
"
                >
                  <svg
                    className="w-5 h-5 mr-2 fill-current text-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  120 day premium package
                </li>
                <li
                  className="flex items-center mt-2 line-through
"
                >
                  <svg
                    className="w-5 h-5 mr-2 fill-current text-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Latest update of premium contant
                </li>
                <li
                  className="flex items-center mt-2 line-through
"
                >
                  <svg
                    className="w-5 h-5 mr-2 fill-current text-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Access carreer building workshop
                </li>
                <li
                  className="flex items-center mt-2 line-through
"
                >
                  <svg
                    className="w-5 h-5 mr-2 fill-current text-gray-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Access carreer building support
                </li>
              </ul>
            </div>
            <div className="bg-gray-800   px-4 py-4 sm:px-6">
              <div className="w-full   rounded-md border border-transparent px-4 py-2 bg-white text-base font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center mt-2">
                Start Fremium{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L8.45 8.33 2 9l5.17 4.43L5.8 19 12 15.5 18.2 19l-1.37-5.57L22 9l-6.45-.67z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pro Membership Card */}
          <div className="bg-white overflow-hidden flex justify-between flex-col   shadow-md rounded-xl border-2 ">
            <div className="px-4 py-5 sm:p-6 ">
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
                <li className="flex items-center mt-2">
                  <svg
                    className="w-5 h-5 mr-2 fill-current text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  120 day premium package
                </li>
                <li className="flex items-center mt-2">
                  <svg
                    className="w-5 h-5 mr-2 fill-current text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Latest update of premium contant
                </li>
                <li className="flex items-center mt-2">
                  <svg
                    className="w-5 h-5 mr-2 fill-current text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Access carreer building workshop
                </li>
                <li className="flex items-center mt-2">
                  <svg
                    className="w-5 h-5 mr-2 fill-current text-green-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  Access carreer building support
                </li>
              </ul>
            </div>
            <Link href={"/payment"} className="bg-gray-800   px-4 py-4 sm:px-6">
              <button className="w-full  hover:text-white rounded-md border border-transparent px-4 py-2 bg-white text-base font-medium  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center mt-2">
                Upgrade to Premium{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 fill-current ml-2"
                  viewBox="0 0 24 24"
                  style={{ color: "#E3BE29" }}
                >
                  <path d="M12 2L8.45 8.33 2 9l5.17 4.43L5.8 19 12 15.5 18.2 19l-1.37-5.57L22 9l-6.45-.67z" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;

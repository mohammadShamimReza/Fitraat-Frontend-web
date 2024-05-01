import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  auth: boolean;
  daysCompleted: number;
}

const CompliteTask: React.FC<Props> = ({ auth, daysCompleted }) => {
  const handleAuthRestart = () => {
    localStorage.setItem("unAuthDayId", "1");
    window.location.reload();
  };
  const Router = useRouter();
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-xl w-full p-8 rounded-lg ">
        {auth ? (
          <div>
            <h1 className="text-3xl font-bold mb-6">Congratulations!</h1>
            <p className="mb-4">
              You have successfully completed your 120-day journey to overcome
              porn addiction.
            </p>

            <button
              className={`px-4 py-2  rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
            >
              Restart from Beginning
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold text-center mb-8">
              Congratulation
            </h1>
            <h1 className="text-2xl font-bold mb-6">
              Stay Strong, You have completed {daysCompleted} out of 40 days.
              Keep going!
            </h1>
            <button
              className={`px-4 py-2  rounded-md focus:outline-none bg-gray-600 hover:bg-gray-800 text-white w-full`}
              onClick={() => handleAuthRestart()}
            >
              Restart from Beginning
            </button>
            <p className="mt-6 mb-4 text-lg">
              Consider upgrading to Premium for additional support and features.
            </p>
            <button
              className="w-full bg-gray-600 text-white rounded-md border border-transparent px-4 py-2  text-base font-medium  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center mt-2"
              onClick={() => Router.push("register")}
            >
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
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
          <p className="mb-2">Check out these resources:</p>
          <ul className="list-disc pl-6">
            <li>
              <a
                href="https://facebook.com"
                className="text-blue-500 underline hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            {/* <li>
              <a
                href="https://www.nofap.com/"
                className="text-blue-500 underline hover:text-blue-700"
                type="Email"
                target="_blank"
                rel="noopener noreferrer"
              >
                NoFap Community
              </a>
            </li> */}
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions or need further assistance, feel free to
            reach out:
          </p>
          <p className="mt-2">Email: support@detox-dopamine@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default CompliteTask;

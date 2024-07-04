"use client";
import {
  useGetUserInfoQuery,
  useUpdateUserDayMutation,
} from "@/redux/api/authApi";
import { message } from "antd";
import "tailwindcss/tailwind.css";

function ProfilePage() {
  const {
    data: authenticatedUserInfoData,
    isLoading,
    isError: authenticatedUserInfoDataError,
    isSuccess,
  } = useGetUserInfoQuery();
  const [updataUserDay] = useUpdateUserDayMutation();

  const name = authenticatedUserInfoData?.username;
  const age = authenticatedUserInfoData?.age;
  const email = authenticatedUserInfoData?.email;
  const compliteDay = authenticatedUserInfoData?.compliteDay || 0;
  const userId = authenticatedUserInfoData?.id;
  const location = authenticatedUserInfoData?.country;

  const days = Array.from({ length: 120 }, (_, i) => i + 1);
  const progressData = days.map((day) => ({
    day,
    completed: day <= compliteDay,
  }));

  const handleRestart = async () => {
    alert("Do you want to restart!");

    try {
      const result = await updataUserDay({
        currentDay: 1,
        compliteDay: 0,
        userId: userId,
      });
            localStorage.setItem(
              "AuthDay",
              JSON.stringify({
                video: false,
                kagel: false,
                quiz: false,
                rewards: false,
                Blog: false,
              })
            );


      console.log(result);
      message.success("You have successfully start your journy again!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"container mx-auto py-8 px-4"}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Profile Info */}
        <div className={"bg-white shadow-lg rounded-lg p-6"}>
          <div className={" "}>
            <h1 className="text-3xl font-semibold  mb-4 underline text-red-500">
              Profile
            </h1>
            <p className="text-xl font-semibold">
              Name: <span className="text-red-500">{name}</span>
            </p>
            <p className="text-xl font-semibold">
              Age: <span className="text-red-500"> {age}</span>
            </p>
            <p className="text-xl font-semibold">
              Location: <span className="text-red-500"> {location}</span>
            </p>
            <p className="text-xl font-semibold">
              Email: <span className="text-red-500"> {email}</span>
            </p>
            <p className="text-xl font-semibold">
              Completed:{" "}
              <span className="text-red-500"> {compliteDay} Days</span>
            </p>
          </div>
        </div>

        {/* Additional Information */}
        <div className={"bg-white shadow-lg rounded-lg p-6"}>
          <h1 className="text-3xl font-semibold text-center mb-4 text-red-500">
            Do you want to start again?
          </h1>
          <p className="text-center">
            Do you break you commitment. Dont worry. Start again from screatch
          </p>
          <div className="flex justify-center">
            <div className="bg-white p-6 ">
              <button
                className={`px-4 py-2 text-white rounded focus:outline-none 
                bg-gray-600 hover:bg-gray-700
                `}
                onClick={handleRestart}
              >
                Restart from Day 0
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`bg-white border rounded-lg p-6 mt-8`}>
        <h1 className="text-3xl  font-semibold text-center mb-4 underline">
          Remaining: <span className="text-red-500">{120 - compliteDay} </span>
          Days
        </h1>
        <br />
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

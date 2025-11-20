"use client";

import { useUpdateUserDayMutation } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { message } from "antd";
import { useRouter } from "next/navigation";

const CompletedAuthTask = () => {
  const router = useRouter();
  const getUserInfoData = useAppSelector((state) => state.auth.userInfo);
  const [
    updataUserDay,
    { isError: updateUserDayError, isSuccess: updateUserDaySuccess },
  ] = useUpdateUserDayMutation();
  const userId = getUserInfoData?.id;

  const handleRestart = async () => {
    alert("Do you want to restart!");

    try {
      await updataUserDay({
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
          Blog: false,
        })
      );
      if (updateUserDaySuccess) {
        message.success("You have successfully started your journey again!");
      } else if (updateUserDayError) {
        message.info("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
    }
    redirectToMembership();
  };

  const redirectToMembership = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  ">
      <div className="p-8 bg-white border rounded-xl shadow-md max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Congratulations!</h1>
        <p className="text-lg mb-6">
          You&apos;ve completed your Task. We&apos;re thrilled to have you on
          this journey!
        </p>

        <button
          className={`px-4 py-2  rounded-xl focus:outline-none bg-gray-600 hover:bg-gray-800 text-white`}
          onClick={handleRestart}
        >
          Restart Journey
        </button>
      </div>
    </div>
  );
};

export default CompletedAuthTask;

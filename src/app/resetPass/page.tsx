"use client";

import { storeTokenInCookie } from "@/lib/auth/token";
import { useChengePasswordMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  password: string;
  passwordConfirmation: string;
}

export default function ResetPass() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [chengePassword] = useChengePasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!code) {
      message.error("Reset code is missing.");
      return;
    }

    if (data.password !== data.passwordConfirmation) {
      message.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const result: any = await chengePassword({
        code,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });
      console.log(result, "result");
      if (result?.data?.jwt && result?.data?.user) {
        // Store JWT & user info like login
        const { jwt, user } = result.data;
        storeTokenInCookie(jwt);
        dispatch(storeAuthToken(jwt));
        dispatch(storeUserInfo(user));

        message.success("Password reset successfully!");
        router.push("/authTask"); // redirect to dashboard or task page
        window.location.reload();
      } else {
        message.error(
          result?.error?.data?.message || "Failed to reset password."
        );
      }
    } catch (err: any) {
      message.error(
        err?.data?.message || "Something went wrong. Try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-xl p-8 rounded-xl shadow-lg bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              placeholder="Enter new password"
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("passwordConfirmation", {
                required: "Confirm password",
              })}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-600 hover:text-gray-800"
            >
              {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            {errors.passwordConfirmation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.passwordConfirmation.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-lg text-white font-bold transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

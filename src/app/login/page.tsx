"use client";
import {
  getTokenFromCookie,
  removeTokenFromCookie,
  storeTokenInCookie,
} from "@/lib/auth/token";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function LoginPage() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [loginUser, { error }] = useLoginUserMutation();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const authTokenFromRedux = useAppSelector((state) => state.auth.authToken);

  const removeTokenFromCookies = useCallback(() => {
    return removeTokenFromCookie();
  }, []); // empty dependency array means the function does not depend on any variables

  useEffect(() => {
    const authToken = getTokenFromCookie() || authTokenFromRedux;
    if (authToken) {
      router.push("/myTasks");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.identifier !== "" && formData.password !== "") {
      try {
        const result: any | Error = await loginUser(formData);
        if (result?.error) {
          message.error("User is not valid");
        } else {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
          router.push("/myTasks");
          message.success("Login successfully");
          storeTokenInCookie(result?.data?.jwt);
          dispatch(storeAuthToken(result?.data?.jwt));

          dispatch(storeUserInfo(result?.data?.user));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("Login successfully");
    }
  };

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <div className=" shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email of Username
            </label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Enter your email or username"
              onChange={handleChange}
              required
              value={formData.identifier}
            />
          </div>
          {/* Password Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-lg font-semibold mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            {showPassword ? (
              <EyeOutlined
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 cursor-pointer mt-4"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <EyeInvisibleOutlined
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 cursor-pointer mt-4"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          {/* Forgot Password */}
          <div className="text-right mb-6">
            <Link
              href="#"
              className="text-gray-600 hover:text-gray-800 underline"
            >
              Forgot Password?
            </Link>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors w-full mb-4"
          >
            Login
          </button>
          {/* Or */}
          <div className="text-center text-gray-600 mb-4">Or</div>
          {/* Social Auth Buttons */}
          <div className="flex justify-center mb-4">
            {/* Google Auth Button */}
            <button className="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mr-4">
              Login with Google
            </button>
            {/* Facebook Auth Button */}
            <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Login with Facebook
            </button>
          </div>
          {/* Signup Link */}
          <div className="text-center text-gray-600 ">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-red-600 hover:text-black underline"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

"use client";

import { storeTokenInCookie } from "@/lib/auth/token";
import { useRegisterUserMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { message } from "antd";
import { formatISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

// Zod schema for form validation
const registerSchema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  age: z.string().nonempty("Age is required"),
  phone: z.string().nonempty("Phone number is required"),
  gender: z.string().nonempty("Gender is required"),
  language: z.string().nonempty("Language is required"),
  currentDay: z.number(),
});

function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentDate = formatISO(new Date());
  const [loading, setLoading] = useState(false); // Add loading state

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    gender: "",
    language: "",
    currentDay: 1,
    startDate: currentDate,
  });
  const [registerUser, { error }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      // Validate form data with Zod
      registerSchema.parse(formData);

      const result: any = await registerUser(formData);
      if (result?.error) {
        if (result?.error?.error?.message === "This attribute must be unique") {
          message.error("Phone is used already.");
        } else if (result?.error) {
          message.error(result?.error.error.message);
        }
      } else {
        message.success("User created successfully");
        storeTokenInCookie(result?.data?.jwt);
        dispatch(storeAuthToken(result?.data?.jwt));
        dispatch(storeUserInfo(result?.data?.user));
        router.push("/");
        window.location.reload();
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Display validation errors
        error.errors.forEach((e) => message.error(e.message));
      } else {
        console.error(error);
        message.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <>
      <div className=" min-h-screen flex flex-col mt-10 items-center">
        <div className=" shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-center mb-10 font-bold text-3xl text-blue-500">
            Registration is Free
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-lg font-semibold mb-2"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-semibold mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Password Input */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-lg font-semibold mb-2"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter your password (min 6 cherecter)"
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
            {/* Age Input */}
            <div className="mb-4">
              <label htmlFor="age" className="block text-lg font-semibold mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            {/* Phone Input */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-lg font-semibold mb-2"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            {/* Gender Input */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-lg font-semibold mb-2"
              >
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {/* Language Input */}
            <div className="mb-4">
              <label
                htmlFor="language"
                className="block text-lg font-semibold mb-2"
              >
                Language
              </label>
              <select
                id="language"
                name="language"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                value={formData.language}
                onChange={handleChange}
                required
              >
                <option value="">Select language</option>
                <option value="Bangla">Bangla</option>
                <option value="English">English</option>
              </select>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors w-full mb-4"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Loading..." : "Register"} {/* Show loading text */}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;

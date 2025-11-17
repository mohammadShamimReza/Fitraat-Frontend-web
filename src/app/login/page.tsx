"use client";
import { storeTokenInCookie } from "@/lib/auth/token";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { storeAuthToken, storeUserInfo } from "@/redux/slice/authSlice";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

// Zod schema for form validation
const loginSchema = z.object({
  identifier: z.string().nonempty("Email or Username is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [loginUser] = useLoginUserMutation();

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

    try {
      // Validate form data with Zod
      loginSchema.parse(formData);

      if (formData.identifier !== "" && formData.password !== "") {
        setLoading(true); // Set loading state to true
        try {
          const result: any | Error = await loginUser(formData);
          if (result?.error) {
            message.error("User is not valid");
          } else {
            message.success("Login successfully");
            storeTokenInCookie(result?.data?.jwt);
            dispatch(storeAuthToken(result?.data?.jwt));

            dispatch(storeUserInfo(result?.data?.user));
          router.push("/programs");
          }
        } catch (error) {
        alert("Something went wrong");
        } finally {
          setLoading(false); // Set loading state to false
        }
      } else {
        message.error("Login is not successfully");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Display validation errors
        error.issues.forEach((e) => message.error(e.message));
      } else {
        console.error(error);
        message.error("An unexpected error occurred");
      }
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-10 justify-left items-center">
      <div className="shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="identifier"
              className="block text-lg font-semibold mb-2"
            >
              Email or Username <span className="text-red-500">*</span>
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
              Password <span className="text-red-500">*</span>
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
          {/* Login Button */}
          <button
            type="submit"
            className={`bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors w-full mb-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Loading..." : "Login"} {/* Show loading text */}
          </button>
          <div className="text-left mt-5 text-gray-600">
            <Link
              href="/forgetPass"
              className="text-gray-600 hover:text-black underline"
            >
              Forget password
            </Link>
          </div>
          <div className="text-center mt-5 text-gray-600">
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

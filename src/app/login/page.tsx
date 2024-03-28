"use client";
import { useState } from "react";
import "tailwindcss/tailwind.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Here you can add your authentication logic
  };

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <div className=" shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-lg font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
            />
          </div>
          {/* Forgot Password */}
          <div className="text-right mb-6">
            <a href="#" className="text-gray-600 hover:text-gray-800 underline">
              Forgot Password?
            </a>
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
            <a
              href="/register"
              className="text-gray-800 hover:text-black underline"
            >
              Register here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

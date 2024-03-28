"use client";

import { useState } from "react";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    gender: "",
    language: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    // Here you can add your registration logic
  };

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <div className=" shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">Register</h1>
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
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
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
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-lg font-semibold mb-2"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Enter your password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />
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
            <label htmlFor="phone" className="block text-lg font-semibold mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
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
              <option value="bangla">Bangla</option>
              <option value="english">English</option>
            </select>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors w-full mb-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

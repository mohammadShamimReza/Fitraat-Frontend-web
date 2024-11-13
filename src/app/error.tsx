"use client";

import { useEffect } from "react";
import { AiOutlineWarning } from "react-icons/ai"; // Install react-icons if you haven't already

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <div className="flex flex-col items-center bg-white shadow-lg p-8 rounded-lg max-w-sm w-full">
        <AiOutlineWarning className="text-red-500 text-6xl mb-4 animate-pulse" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 mb-6">
          An unexpected error occurred. Please try again or contact support if
          the issue persists.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

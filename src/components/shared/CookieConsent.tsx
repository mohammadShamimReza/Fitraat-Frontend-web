"use client";

import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
   const timer = setTimeout(() => {
     const hasAccepted = localStorage.getItem("cookieConsent");
     if (!hasAccepted) {
       setIsVisible(true);
     }
   }, 0);

   return () => clearTimeout(timer);
 }, []);

  const handleAccept = () => {
    // Set a flag in localStorage to track consent
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null; // Don't render if consent has already been given

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-gray-700 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          We use cookies to improve your experience on our website. By
          continuing to browse, you agree to our{" "}
          <a href="/privacy" className="text-blue-400 underline">
            cookie policy
          </a>
          .
        </p>
        <button
          onClick={handleAccept}
          className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;

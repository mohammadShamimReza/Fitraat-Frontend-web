// Path: nextjs-frontend/src/app/auth/signup-success/page.tsx

// import Link from "next/link";

// export default function EmailConfirmed() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
//       <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md text-center">
//         <h2 className="text-2xl font-semibold text-green-600">
//           Email Confirmed ✅
//         </h2>

//         <p className="text-gray-700 text-sm">
//           Your email has been successfully verified. You can now log in to your
//           account.
//         </p>

//         <Link href="/login">
//           <button className="mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
//             Go to Login
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }



"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function EmailConfirmed() {
  const [isMobile, setIsMobile] = useState(false);
  const [platform, setPlatform] = useState<"android" | "ios" | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;

    const mobileRegex =
      /Android|iPhone|iPad|iPod|iOS|BlackBerry|IEMobile|Opera Mini/i;

    const isMobileBrowser = mobileRegex.test(ua);

    if (isMobileBrowser) {
      setIsMobile(true);

      if (/Android/i.test(ua)) setPlatform("android");
      else setPlatform("ios");

      setTimeout(() => {
        setShowPopup(true);
      }, 400);
    }
  }, []);

  const openApp = () => {
    const deepLink = "fitraat://signup-success";

    // Try open app
    window.location.href = deepLink;

    // If fails → fallback
    setTimeout(() => {
      if (platform === "android") {
        window.location.href =
          "https://play.google.com/store/apps/details?id=com.fitraat.app";
      } else {
        window.location.href = "https://apps.apple.com/app/fitraat/id123456789";
      }
    }, 1500);
  };

  return (
    <>
      {/* PREMIUM POPUP */}
      {showPopup && isMobile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl text-center animate-slideUp">
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              Continue in Fitraat App
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              For the best experience, please finish your signup inside the
              Fitraat mobile app.
            </p>

            <button
              onClick={openApp}
              className="mt-6 w-full py-2 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 active:scale-95 transition"
            >
              Open Fitraat App
            </button>

            <p className="text-xs text-gray-500 mt-3">
              If the app is not installed, you’ll be redirected to the store.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-5 w-full py-2 px-4 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
            >
              Continue on Web
            </button>
          </div>
        </div>
      )}

      {/* ORIGINAL PAGE */}
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-green-600">
            Email Confirmed ✅
          </h2>

          <p className="text-gray-700 text-sm">
            Your email has been successfully verified. You can now log in to
            your account.
          </p>

          <Link href="/login">
            <button className="mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Go to Login
            </button>
          </Link>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

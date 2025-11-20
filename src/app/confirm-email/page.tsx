"use client";

import { useResendConfirmationEmailMutation } from "@/redux/api/authApi";
import { message } from "antd";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PleaseConfirmEmail() {
  const searchParams = useSearchParams();
 const userEmail = searchParams.get("email");

 // simple email validation
 const isValidEmail = (email: string) =>
   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

 const [email, setEmail] = useState(() => {
   if (userEmail && isValidEmail(userEmail)) {
     return userEmail;
   }
   return ""; // empty if not valid
 });
  const [resendEmail, { isLoading, isSuccess, isError, error }] =
    useResendConfirmationEmailMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      message.error("Email is required");
      return;
    }

    try {
      const res: {email: string, sent: boolean} = await resendEmail({ email }).unwrap();
      if (res.sent) {
        
        message.success("Confirmation email sent");
      }
      console.log(res);
    } catch (err: any) {
      message.error(err?.data?.error?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold">Confirm Your Email</h2>

        <p className="text-gray-700 text-sm">
          We’ve sent a confirmation link to your email address. Please check
          your inbox and click the link to verify your account before logging
          in.
        </p>

        <p className="text-gray-500 text-sm">
          Didn’t receive the email? Try resending it below.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full my-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {isLoading ? "Sending..." : "Resend Confirmation Email"}
          </button>
        </form>
      </div>
    </div>
  );
}

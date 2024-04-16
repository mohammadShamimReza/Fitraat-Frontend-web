"use client";
import { useForgetPasswordMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  email: string;
}

export default function ForgotPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [forgetPassword] = useForgetPasswordMutation();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await forgetPassword(data);
    console.log(result);

    // setIsLoading(true);
    // Simulate sending reset password email
    console.log(data.email);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   router.push("/reset-password");
    // }, 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl  p-8 rounded shadow-lg"
      >
        <h2 className="text-4xl text-red-500">
          Sorry this feacture is not available now. It will come soon Thanks!
        </h2>
        <br />
        <h2 className="text-2xl font-bold mb-4 ">Forgot Password</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block  font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full border rounded px-3 py-2 outline-none bg-white cursor-not-allowed"
            disabled={true}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-black  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}

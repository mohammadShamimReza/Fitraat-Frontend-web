"use client";
import { useForgetPasswordMutation } from "@/redux/api/authApi";
import { Modal, message } from "antd";
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
  const [modalVisible, setModalVisible] = useState(false);

  const [forgetPassword] = useForgetPasswordMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const result: any = await forgetPassword(data);
      console.log(result);

      if (result?.data?.ok) {
        setModalVisible(true);
      } else {
        message.error("Email not found or something went wrong.");
      }
    } catch (error) {
      message.error("Failed to send reset link. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl p-8 rounded shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 ">Forgot Password</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-2">
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
            className="w-full border rounded px-3 py-2 outline-none bg-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={` ${
            isLoading ? "cursor-not-allowed" : ""
          } w-full bg-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white `}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {/* Success Popup */}
      <Modal
        title="Reset Link Sent ✅"
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
        okText="Got it"
      >
        <p>
          A password reset link has been sent to your email. <br />
          If you don’t see it in your inbox, please check your spam/junk folder.
        </p>
      </Modal>
    </div>
  );
}

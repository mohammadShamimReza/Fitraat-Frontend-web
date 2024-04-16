"use client";

import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    // Simulate password change logic
    setTimeout(() => {
      setIsLoading(false);
      message.success("Password changed successfully!");
      router.push("/");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xl p-8 rounded-xl shadow-lg">
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="w-full "
        >
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" {...register("email")} />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password {...register("newPassword")} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password {...register("confirmPassword")} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

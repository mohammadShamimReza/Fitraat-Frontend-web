"use client";

import { useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const { Option } = Select;

// Define the schema using zod
const schema = z.object({
  cus_name: z.string().min(1, "Please enter your name"),
  cus_email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Please enter your email"),
  total_amount: z.number().positive(),
  product_name: z.string(),
  product_category: z.string(),
  product_profile: z.string(),
  cus_add1: z.string(),
  cus_country: z.string(),
  cus_phone: z.string(),
  currency: z.enum(["USD", "BDT"], {
    required_error: "Please select a currency",
  }),
  tran_id: z.string().uuid("Invalid transaction ID format"),
  userId: z.string().min(1, "User ID is required"),
});

type PaymentFormValues = z.infer<typeof schema>;

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);

  // Get user info from Redux store
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  // Initialize the form using react-hook-form with zod schema
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      cus_name: userInfo?.username,
      cus_email: userInfo?.email,
      tran_id: uuidv4(),
      currency: "BDT",
      total_amount: 20,
      userId: userInfo?.id?.toString() || "",
      product_name: "Detox-dopamine",
      product_category: "Mental & physical",
      product_profile: "Fitraat",
      cus_add1: "Dhaka",
      cus_country: userInfo?.country || "",
      cus_phone: userInfo?.phone || "",
    },
  });

  // Watch for currency changes
  const selectedCurrency = watch("currency");

  // Update the total_amount field based on the currency selection
  useEffect(() => {
    if (selectedCurrency === "USD") {
      setValue("total_amount", 20);
    } else if (selectedCurrency === "BDT") {
      setValue("total_amount", 2000);
    }
  }, [selectedCurrency, setValue]);

  // Handle form submission
  const onSubmit = (data: PaymentFormValues) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-8 bg-gray-900 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Payment Details</h2>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label={<span>Name</span>}
            validateStatus={errors.cus_name ? "error" : ""}
            help={errors.cus_name?.message}
          >
            <Controller
              name="cus_name"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Enter your name"
                  className="border-gray-700"
                  {...field}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={<span>Email</span>}
            validateStatus={errors.cus_email ? "error" : ""}
            help={errors.cus_email?.message}
          >
            <Controller
              name="cus_email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="border-gray-700"
                  {...field}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={<span>Total Amount</span>}
            validateStatus={errors.total_amount ? "error" : ""}
            help={errors.total_amount?.message}
          >
            <Input
              type="number"
              placeholder="Enter the amount"
              className="border-gray-700"
              disabled
              value={selectedCurrency === "USD" ? 20 : 2000}
            />
          </Form.Item>

          <Form.Item
            label={<span>Currency</span>}
            validateStatus={errors.currency ? "error" : ""}
            help={errors.currency?.message}
          >
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Select a currency"
                  className="border-gray-700"
                  value={field.value} // Set value explicitly
                  onChange={(value) => field.onChange(value)} // Handle change explicitly
                >
                  <Option value="USD">USD</Option>
                  <Option value="BDT">BDT</Option>
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Pay Now With sslcommerz
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PaymentPage;

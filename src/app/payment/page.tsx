"use client";

import { usePaymentInitMutation } from "@/redux/api/payment";
import { useAppSelector } from "@/redux/hooks";
import { Input, message, Select, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { z } from "zod";

const { Option } = Select;
const { Title, Text } = Typography;

const programs = [
  { label: "Porn Recovery", value: "fitraat", priceBDT: 899, oldPrice: 1299 },
  { label: "Kegel Exercise", value: "kegel", priceBDT: 499, oldPrice: 799 },
  { label: "Child Protection", value: "child", priceBDT: 699, oldPrice: 999 },
];

const schema = z.object({
  cus_phone: z.string().min(1, "Phone is required"),
  total_amount: z.number().positive(),
  currency: z.enum(["USD", "BDT"]),
  product_name: z.string(),
  product_profile: z.string(),
  cus_add1: z.string(),
  cus_country: z.string(),
  userId: z.string(),
});

const PaymentPage: React.FC = () => {
  const [paymentInit] = usePaymentInitMutation();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [selectedProgram, setSelectedProgram] = useState(programs[0]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    cus_name: userInfo?.username || "",
    cus_email: userInfo?.email || "",
    cus_phone: userInfo?.phone || "",
    total_amount: selectedProgram.priceBDT,
    currency: "BDT",
    product_name: selectedProgram.label,
    product_profile: "Fitraat",
    cus_add1: "Dhaka",
    cus_country: "Bangladesh",
    userId: userInfo?.id?.toString(),
    product_category: selectedProgram.value,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      total_amount: selectedProgram.priceBDT,
      product_name: selectedProgram.label,
      product_profile: selectedProgram.label,
      product_category: selectedProgram.value,
    }));
  }, [selectedProgram]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userId: userInfo?.id?.toString(),
      cus_name: userInfo?.username || "",
      cus_email: userInfo?.email || "",
    }));
  }, [userInfo]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrors({});
      schema.parse(formData);

      const result = await paymentInit(formData).unwrap();
      if (result?.url) {
        window.location.replace(result.url);
      } else {
        message.error("Payment initialization failed");
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          fieldErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(fieldErrors);
      } else {
        message.error("Server error, please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5 ">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <Title level={3} className="text-center mb-6 text-gray-800">
          💳 Secure Payment
        </Title>

        {/* Program Selector */}

        {/* Price Section */}
        <div className="bg-gray-100 rounded-lg p-5 mb-6 border border-gray-200 text-center">
          <div className="flex justify-center items-center gap-2">
            <span className="line-through text-gray-400">
              ৳{selectedProgram.oldPrice}
            </span>
            <span className="text-2xl font-bold text-gray-900">
              ৳{selectedProgram.priceBDT}
            </span>
          </div>

          <div className="text-sm text-gray-500 mt-2">
            Save up to{" "}
            <strong className="text-gray-900">
              {Math.round(
                ((selectedProgram.oldPrice - selectedProgram.priceBDT) /
                  selectedProgram.oldPrice) *
                  100
              )}
              %
            </strong>{" "}
            now
          </div>
          <div className="mt-5">
            <Text strong>Select Program</Text>
            <Select
              value={selectedProgram.value}
              className="w-full mt-2"
              onChange={(value) =>
                setSelectedProgram(programs.find((p) => p.value === value)!)
              }
            >
              {programs.map((p) => (
                <Option key={p.value} value={p.value}>
                  {p.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Name"
            value={formData.cus_name}
            onChange={(e) => handleChange("cus_name", e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={formData.cus_email}
            onChange={(e) => handleChange("cus_email", e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={formData.cus_phone}
            onChange={(e) => handleChange("cus_phone", e.target.value)}
          />
          {errors.cus_phone && (
            <p className="text-red-500 text-sm">{errors.cus_phone}</p>
          )}

          <Select
            value={formData.currency}
            onChange={(value) => handleChange("currency", value)}
            className="w-full"
          >
            <Option value="BDT">BDT</Option>
          </Select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-6 w-full py-3 rounded-lg font-bold text-white ${
            loading ? "bg-gray-50" : "bg-gray-700 hover:bg-gray-600"
          } ${!userInfo && "cursor-not-allowed"}`}
        >
          {!userInfo || loading ? (
            <Spin />
          ) : (
            `Pay ৳${selectedProgram.priceBDT} Now`
          )}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          🔒 Secure payment powered by SSLCommerz
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;

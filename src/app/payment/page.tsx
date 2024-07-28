"use client";

import { Button, Card, Form, Input, message, Select } from "antd";
import axios from "axios";
import { useState } from "react";
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "detox66a61e060bcb8";
const store_passwd = "detox66a61e060bcb8@ssl";
const is_live = false; //true for live, false for sandbox

const { Option } = Select;

interface PaymentFormValues {
  name: string;
  email: string;
  amount: number;
  paymentMethod: string;
}

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: PaymentFormValues) => {
    setLoading(true);

    const data = {
      total_amount: 100,
      currency: "BDT",
      tran_id: "REF123", // use unique tran_id for each api call
      success_url: "http://localhost:3030/success",
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: "customer@example.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    try {
      const response = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php", // SSLCommerz sandbox URL
        data
      );

      console.log(response);

      if (response.data.status === "SUCCESS") {
        // Redirect the user to the payment gateway
        const GatewayPageURL = response.data.GatewayPageURL;
        window.location.href = GatewayPageURL; // Redirect to payment URL
      } else {
        message.error(
          `Payment initialization failed: ${response.data.failedreason}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while processing your payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <Card className="w-full max-w-md p-8 bg-gray-900 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 ">
          Payment Details
        </h2>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label={<span className="">Name</span>}
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              placeholder="Enter your name"
              className="  border-gray-700"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span className="">Email</span>}
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="  border-gray-700"
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label={<span className="">Amount</span>}
            rules={[{ required: true, message: "Please enter the amount" }]}
          >
            <Input
              type="number"
              placeholder="Enter the amount"
              className="  border-gray-700"
            />
          </Form.Item>

          <Form.Item
            name="paymentMethod"
            label={<span className="">Payment Method</span>}
            rules={[
              { required: true, message: "Please select a payment method" },
            ]}
          >
            <Select
              placeholder="Select a payment method"
              className="  border-gray-700"
            >
              <Option value="creditCard" className=" ">
                Credit Card
              </Option>
              <Option value="bankTransfer" className=" ">
                Bank Transfer
              </Option>
              {/* Add more payment methods as required */}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 "
            >
              Pay Now
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PaymentPage;

"use client";

import { useAppSelector } from "@/redux/hooks";
import { Button, Card, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

function PaymentResult({ params }: { params: Promise<{ slug: string[] }> }) {
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  // Use React.use to unwrap params
  const { slug } = React.use(params);

  const userId = Number(userInfo?.id); // Ensure userId is a number

  // Determine the payment result
  const result =
    slug[0] === "redirectSuccess"
      ? "success"
      : slug[0] === "fail"
      ? "fail"
      : slug[0] === "cancel"
      ? "cancel"
      : "";


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card
        style={{ maxWidth: 400, width: "100%" }}
        className="shadow-lg"
        bordered
      >
        <Title level={3} style={{ textAlign: "center" }}>
          {result === "success"
            ? "Payment Successful"
            : result === "fail"
            ? "Payment Failed"
            : result === "cancel"
            ? "Payment Cancelled"
            : "Unknown Status"}
        </Title>
        <div style={{ textAlign: "center", marginTop: 16 }}>
          {result === "success" && (
            <div>
              <Text strong style={{ color: "green" }}>
                Thank you for your payment!
              </Text>

              <Text style={{ display: "block", marginTop: 8 }}>
                Your payment has been successfully processed. You can now enjoy
                premium features.
              </Text>
            </div>
          )}
          {result === "fail" && (
            <div>
              <Text strong style={{ color: "red" }}>
                Your payment could not be processed.
              </Text>
              <Text style={{ display: "block", marginTop: 8 }}>
                Please try again later or contact support.
              </Text>
            </div>
          )}
          {result === "cancel" && (
            <div>
              <Text strong style={{ color: "orange" }}>
                Your payment was cancelled.
              </Text>
              <Text style={{ display: "block", marginTop: 8 }}>
                If this was unintentional, you can try again.
              </Text>
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          {result === "success" && (
            <Button type="primary" onClick={() => window.location.replace("/")}>
              Go to Dashboard
            </Button>
          )}
          {(result === "fail" || result === "cancel") && (
            <Button
              type="primary"
              danger
              onClick={() => window.location.replace("/payment")}
            >
              Retry Payment
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

export default PaymentResult;

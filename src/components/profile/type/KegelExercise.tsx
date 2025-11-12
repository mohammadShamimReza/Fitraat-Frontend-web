"use client";

import { Button, Card } from "antd";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface UserData {
  username: string;
  kagelPayment: string;
  kagelIndividualDayNumber: number;
}

export default function KegelExercise({ user }: { user: UserData }) {
  const totalExercises = 180;
  const completed = user.kagelIndividualDayNumber;
  const isPaid = user.kagelPayment === "Complete";

  const progress = Math.min(completed, totalExercises);
  const remaining = totalExercises - progress;

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [progress, remaining],
        backgroundColor: isPaid
          ? ["#007BFF", "#E0E0E0"]
          : ["#B0BEC5", "#ECEFF1"],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Card
      style={{
        borderRadius: 20,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: 400,
        margin: "auto",
        padding: 20,
      }}
    >
      <h2 style={{ marginBottom: 15 }}>Kegel Exercise Progress</h2>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 250,
          margin: "auto",
        }}
      >
        <Doughnut data={data} options={options} />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
            {progress}/{totalExercises}
          </p>
          <p style={{ fontSize: 14, margin: 0 }}>Exercises</p>
        </div>
      </div>

      {isPaid ? (
        <p
          style={{
            color: "#007BFF",
            fontWeight: 500,
            marginTop: 15,
          }}
        >
          Payment Completed ✅
        </p>
      ) : (
        <div>
          <p style={{ color: "#FF5252", fontWeight: 500, marginTop: 15 }}>
            Payment Pending ❌
          </p>
          <Button
            type="primary"
            style={{
              backgroundColor: "#007BFF",
              borderColor: "#007BFF",
              borderRadius: 8,
              marginTop: 8,
            }}
            onClick={() => console.log("Redirecting to payment...")}
          >
            Pay Now
          </Button>
        </div>
      )}
    </Card>
  );
}

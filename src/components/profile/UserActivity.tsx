"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import "tailwindcss/tailwind.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PerformancePieChartProps {
  completed: number; // Tasks completed
  total: number; // Total tasks to be completed
  tasksPerDay?: number; // Tasks the user is expected to complete per day
}

const UserActivityPieChart: React.FC<PerformancePieChartProps> = ({
  completed,
  total,
  tasksPerDay = 5,
}) => {
  const remaining = total - completed;
  const percentageCompleted = ((completed / total) * 100).toFixed(2);
  const daysRequired = Math.ceil(remaining / tasksPerDay);

  const randomQuote = "Keep going, you're doing great!";

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        label: "Performance",
        data: [completed, remaining > 0 ? remaining : 0],
        backgroundColor: ["#00C49F", "#FF6384"],
        hoverBackgroundColor: ["#26D0B8", "#FF85A0"],
        borderColor: ["#00A086", "#D9536E"],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  interface TooltipDataset {
    data: number[];
  }

  interface TooltipItem {
    dataIndex: number;
    label?: string;
    dataset: TooltipDataset;
  }

  interface TooltipCallbacks {
    label: (tooltipItem: TooltipItem) => string;
  }

  interface TooltipOptions {
    callbacks: TooltipCallbacks;
    backgroundColor?: string;
    titleColor?: string;
    bodyColor?: string;
    borderColor?: string;
    borderWidth?: number;
    padding?: number;
  }

  interface LegendOptions {
    display: boolean;
  }

  interface PluginsOptions {
    legend: LegendOptions;
    tooltip: TooltipOptions;
  }

  interface ChartOptions {
    plugins: PluginsOptions;
  }

  const options: ChartOptions = {
    plugins: {
      legend: {
        display: false, // Hide legend to simplify the look
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset.data;
            const value = dataset[tooltipItem.dataIndex];
            return `${tooltipItem.label}: ${value} tasks`;
          },
        },
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#555",
        borderWidth: 1,
        padding: 10,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg  ">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>

      {/* Chart */}
      <div className="relative group w-48 h-48">
        <Pie data={data} options={options} />
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300  text-center p-4 rounded-lg">
          <div>
            <p className="font-bold text-2xl">Total day: 40</p>
            <p className="font-bold text-lg">Total Unlocked: {total}</p>
            <p className="text-sm mt-1">Completed: {completed}</p>
            <p className="text-sm mt-1">
              Remaining: {remaining > 0 ? remaining : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 text-center">
        <p className="text-lg font-bold">
          {percentageCompleted}% of your tasks are completed!
        </p>
        {remaining > 0 && (
          <p className="text-md mt-2">
            You need approximately{" "}
            <span className="font-semibold">{daysRequired} days</span> to
            complete the remaining tasks.
          </p>
        )}
        <p className="italic text-md mt-4 text-red-500">{randomQuote}</p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
          <span>Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default UserActivityPieChart;

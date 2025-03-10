"use client";

import React from "react";
import NavBar from "@/components/NavBar";
import BarChart from "@/components/BarChart";
import { ChartData, ChartOptions } from "chart.js";

const Readiness = () => {
  const sendToTelegram = async (message: string) => {
    try {
      const response = await fetch("/api/sendToTelegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      console.log("Telegram Response:", data);
    } catch (error) {
      console.error("Failed to send message to Telegram", error);
    }
  };

  const formatChartData = (chartData: ChartData<"bar">): string => {
    const labels = chartData.labels ?? [];
    const dataset = chartData.datasets[0];

    return (
      `${dataset.label || "No Label"}\n` +
      labels
        .map((label, index) => `${label}: ${dataset.data[index] ?? "N/A"}`)
        .join("\n")
    );
  };

  const data: ChartData<"bar"> = {
    labels: ["JKT", "JKT", "SBY", "SBY", "DIY", "DIY"],
    datasets: [
      {
        label: "Recap Data",
        data: [10, 20, 15, 25, 30, 18],
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        ticks: {
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div className="w-screen h-screen flex flex-col relative bg-[#fff] text-[#000]">
      <div className="absolute">
        <NavBar />
      </div>
      <div className="px-[15vw] pt-[2vw]">
        <div className="w-[26.198vw] h-[2.552vw] flex items-center justify-between">
          <div className="w-[2.656vw] h-[2.552vw] bg-gradient-to-r from-[#51B5DD] to-[#0091B6] rounded-l-[1vw] rounded-r-[0.2vw]"></div>
          <h1 className="text-[1.979vw] font-bold">Readiness Overview</h1>
          <div className="w-[2.656vw] h-[2.552vw] bg-gradient-to-r from-[#0091B6] to-[#51B5DD] rounded-r-[1vw] rounded-l-[0.2vw]"></div>
        </div>
      </div>
      {/* <Header /> */}
      <div className="w-full h-full px-[15vw] pt-[2vw] flex relative">
        <div className="w-[59.271vw] h-[39vw] rounded-[0.781vw] shadow-xl p-[1vw] relative">
          <h1 className="font-bold text-[1.458vw] mb-[0.5vw]">
            Recent Updates
          </h1>
          <div className="w-full flex items-center justify-between mb-[1vw]">
            <div className="w-[12.552vw] h-[5.365vw] rounded-[1vw] shadow-lg"></div>
            <div className="w-[12.552vw] h-[5.365vw] rounded-[1vw] shadow-lg"></div>
            <div className="w-[12.552vw] h-[5.365vw] rounded-[1vw] shadow-lg"></div>
            <div className="w-[12.552vw] h-[5.365vw] rounded-[1vw] shadow-lg"></div>
          </div>
          <BarChart data={data} options={options}></BarChart>
          <button
            className=" rounded-[0.3vw] w-[7vw] h-[2vw] bg-[#0092b6] absolute right-0 bottom-[-2.5vw] font-bold text-white text-[0.7vw] hover:bg-[#007a99] active:bg-[#00637d]"
            onClick={() => sendToTelegram(formatChartData(data))}
          >
            Send to Telegram
          </button>
        </div>
      </div>
    </div>
  );
};

export default Readiness;

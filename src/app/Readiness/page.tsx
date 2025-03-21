"use client";

import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import BarChart from "@/components/BarChart";
import { ChartData, ChartOptions } from "chart.js";

const Readiness = () => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/rekapitulasi"); // Sesuaikan dengan endpoint API-mu
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        const result = await response.json();

        if (result.data) {
          const labels = result.data.map((lokasi: any) => lokasi.lokasi);
          const dataValues = result.data.map((lokasi: any) => lokasi.persentase_ready.replace("%", ""));

          const formattedData: ChartData<"bar"> = {
            labels,
            datasets: [
              {
                label: "Persentase Kesiapan",
                data: dataValues.map(Number),
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "rgba(0, 146, 182, 0.5)",
              },
            ],
          };

          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sendToTelegram = async (message: string, chatId: string) => {
    try {
      const response = await fetch("/api/sendToTelegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, chatId }),
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
        .map((label, index) => `${label}: ${dataset.data[index] ?? "N/A"}%`)
        .join("\n")
    );
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
        max: 100,
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
      <div className="w-full h-full px-[15vw] pt-[2vw] flex relative">
        <div className="w-[59.271vw] h-[39vw] rounded-[0.781vw] shadow-xl p-[1vw] relative">
          <h1 className="font-bold text-[1.458vw] mb-[0.5vw]">
            Recent Updates
          </h1>
          {loading ? (
            <p>Loading data...</p>
          ) : chartData ? (
            <>
              <BarChart data={chartData} options={options} />
              <button
                className="rounded-[0.3vw] w-[7vw] h-[2vw] bg-[#0092b6] absolute right-0 bottom-[-2.5vw] font-bold text-white text-[0.7vw] hover:bg-[#007a99] active:bg-[#00637d]"
                onClick={() =>
                  sendToTelegram(formatChartData(chartData), "6380736334")
                }
              >
                Send to Telegram
              </button>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Readiness;

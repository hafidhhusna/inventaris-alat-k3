"use client";

import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import BarChart from "@/components/BarChart";
import { ChartData, ChartOptions } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Readiness = () => {
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [bulan, setBulan] = useState<number | null>(null);
  const [tahun, setTahun] = useState<number | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      setBulan(date.getMonth() + 1);
      setTahun(date.getFullYear());
    }
  };

  useEffect(() => {
    if (bulan && tahun) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `/api/rekapitulasi?bulan=${bulan}&tahun=${tahun}`
          ); // Sesuaikan dengan endpoint API-mu
          if (!response.ok) {
            throw new Error("Gagal mengambil data");
          }
          const result = await response.json();

          if (result.data) {
            const labels = result.data.map((lokasi: any) => lokasi.lokasi);
            const dataValues = result.data.map((lokasi: any) =>
              lokasi.persentase_ready.replace("%", "")
            );

            const formattedData: ChartData<"bar"> = {
              labels,
              datasets: [
                {
                  label: `Persentase Kesiapan Bulan ${bulan}, Tahun ${tahun}`,
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
    }
  }, [bulan, tahun]);

  const sendToTelegram = async (message: string, chatId: string) => {
    try {
      // const message = formatChartData(chartData);
      // const formattedMessage = `Laporan Kesiapan Bulan ${bulan}, Tahun ${tahun}\n\n${message}`;
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
    <div className="w-screen h-screen flex flex-col relative bg-white text-black">
      {/* Navbar stays fixed or top */}
      <div className="absolute top-0 left-0 w-full">
        <NavBar />
      </div>

      {/* Heading */}
      <div className="px-4 sm:px-[10vw] pt-20 sm:pt-[5vw]">
        <div className="flex items-center justify-between max-w-full sm:w-[26.198vw] h-[10vw] sm:h-[2.552vw]">
          <div className="w-[10vw] sm:w-[2.656vw] h-full bg-gradient-to-r from-[#51B5DD] to-[#0091B6] rounded-l-[3vw] sm:rounded-l-[1vw] sm:rounded-r-[0.2vw]"></div>
          <h1 className="text-lg sm:text-[1.979vw] font-bold text-center flex-1">
            Readiness Overview
          </h1>
          <div className="w-[10vw] sm:w-[2.656vw] h-full bg-gradient-to-r from-[#0091B6] to-[#51B5DD] rounded-r-[3vw] sm:rounded-r-[1vw] sm:rounded-l-[0.2vw]"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex-1 px-4 sm:px-[15vw] pt-4 sm:pt-[2vw] flex justify-center">
        <div className="w-full sm:w-[59.271vw] h-auto sm:h-[39vw] rounded-xl shadow-xl p-4 sm:p-[1vw] relative">
          <h1 className="font-bold text-lg sm:text-[1.458vw] mb-2">
            Recent Updates Bulan
          </h1>

          {/* Date Picker */}
          <div className="mb-4">
            <label
              htmlFor="calendar"
              className="block text-base sm:text-lg font-semibold mb-1"
            >
              Pilih Bulan dan Tahun :
            </label>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
              className="w-full p-2 border rounded"
              placeholderText="Pilih Bulan dan Tahun"
            />
          </div>

          {/* Chart & Button */}
          {loading ? (
            <p>Loading data...</p>
          ) : chartData ? (
            <>
              <BarChart data={chartData} options={options} />
              <div className="flex justify-end mt-4">
                <button
                  className="rounded-md sm:rounded-[0.3vw] w-32 sm:w-[7vw] h-10 sm:h-[2vw] bg-[#0092b6] font-bold text-white text-sm sm:text-[0.7vw] hover:bg-[#007a99] active:bg-[#00637d]"
                  onClick={() =>
                    sendToTelegram(formatChartData(chartData), "6380736334")
                  }
                >
                  Send to Telegram
                </button>
              </div>
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

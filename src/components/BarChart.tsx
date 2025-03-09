"use client";
import React, { useRef, useEffect } from "react";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";

Chart.register(...registerables);

interface BarChartProps {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  // const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, "#F6D510");
    gradient.addColorStop(0, "#FE8021");

    const newData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: gradient,
      })),
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: newData,
      options: options,
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [data, options]);
  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;

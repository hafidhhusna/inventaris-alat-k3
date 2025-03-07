"use client";

import { useEffect, useState } from "react";

type RekapitulasiData = {
  lokasi: string;
  total_items: number;
  ready_items: number;
  persentase_ready: string;
};

export default function RekapitulasiTable() {
  const [data, setData] = useState<RekapitulasiData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/rekapitulasi");
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Lokasi</th>
            <th className="border px-4 py-2">Total Items</th>
            <th className="border px-4 py-2">Ready Items</th>
            <th className="border px-4 py-2">Persentase Ready</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((lokasi, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{lokasi.lokasi}</td>
                <td className="border px-4 py-2">{lokasi.total_items}</td>
                <td className="border px-4 py-2">{lokasi.ready_items}</td>
                <td className="border px-4 py-2 font-bold">
                  {lokasi.persentase_ready}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border px-4 py-2 text-center">
                Tidak ada data inspeksi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

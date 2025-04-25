"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  session: any;
};

export default function DeleteTitikLokasi({ session }: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [lokasi, setLokasi] = useState<
    { lokasi_id: number; nama_lokasi: string }[]
  >([]);

  // Fetch data lokasi dari API
  useEffect(() => {
    async function fetchLokasi() {
      const res = await fetch("/api/upload-titik-lokasi", {
        method: "GET",
      });
      const data = await res.json();
      setLokasi(data);
    }
    fetchLokasi();
  }, []);

  // Handle submit data ke API titik-lokasi
  const onSubmit = async (data: any) => {
    const res = await fetch("/api/upload-titik-lokasi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Data berhasil disimpan!");
      reset();
    } else {
      alert("Gagal menyimpan data");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <Link
        href="/NewElement"
        className="inline-flex items-center justify-center bg-blue-600 text-white text-lg w-10 h-10 rounded-full mb-6 hover:bg-blue-700"
      >
        <FaArrowLeft />
      </Link>
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Hapus Titik Lokasi
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Dropdown Lokasi */}
        <div>
          <label className="block text-sm font-medium mb-1">Lokasi</label>
          <select
            {...register("lokasi_id")}
            className="border border-gray-300 p-2 rounded w-full text-sm"
          >
            <option value="">Pilih Lokasi</option>
            {lokasi.map((loc) => (
              <option key={loc.lokasi_id} value={loc.lokasi_id}>
                {loc.nama_lokasi}
              </option>
            ))}
          </select>
        </div>

        {/* Input Nama Titik Lokasi */}

        {/* Submit Button */}
        <div className="text-center sm:text-left">
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 text-sm sm:text-base"
          >
            Hapus
          </button>
        </div>
      </form>
    </div>
  );
}

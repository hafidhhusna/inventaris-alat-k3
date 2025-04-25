"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

type Props = {
  session: any;
};

export default function LokasiForm({ session }: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: any) => {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/lokasi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);
    if (res.ok) {
      setMessage("Lokasi berhasil ditambahkan!");
      reset();
    } else {
      setMessage("Gagal menyimpan lokasi.");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <Link
        href="/NewElement"
        className="inline-flex items-center justify-center bg-blue-600 text-white text-lg w-10 h-10 rounded-full mb-6 hover:bg-blue-700"
      >
        <FaArrowLeft />
      </Link>

      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
        Tambah Lokasi
      </h2>

      {message && (
        <p
          className={`text-sm mb-4 ${
            message.includes("berhasil") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Input Nama Lokasi */}
        <div>
          <label
            htmlFor="nama_lokasi"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama Lokasi:
          </label>
          <input
            id="nama_lokasi"
            type="text"
            {...register("nama_lokasi")}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}

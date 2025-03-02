"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function LokasiForm() {
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
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Tambah Lokasi</h2>
      {message && <p className="text-green-600">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Input Nama Lokasi */}
        <label className="block">
          Nama Lokasi:
          <input
            type="text"
            {...register("nama_lokasi")}
            className="border p-2 w-full"
            required
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}

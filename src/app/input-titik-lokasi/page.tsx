"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function TitikLokasiForm() {
  const { register, handleSubmit, reset } = useForm();
  const [lokasi, setLokasi] = useState<{ lokasi_id: number; nama_lokasi: string }[]>([]);

  // Fetch data lokasi dari API
  useEffect(() => {
    async function fetchLokasi() {
      const res = await fetch("/api/upload-titik-lokasi", {
        method: "GET"
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
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Tambah Titik Lokasi</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Dropdown Lokasi */}
        <label className="block">
          Lokasi:
          <select {...register("lokasi_id")} className="border p-2 w-full">
            <option value="">Pilih Lokasi</option>
            {lokasi.map((loc) => (
              <option key={loc.lokasi_id} value={loc.lokasi_id}>
                {loc.nama_lokasi}
              </option>
            ))}
          </select>
        </label>

        {/* Input Nama Titik Lokasi */}
        <label className="block">
          Nama Titik Lokasi:
          <input
            type="text"
            {...register("nama_titik_lokasi")}
            className="border p-2 w-full"
            required
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

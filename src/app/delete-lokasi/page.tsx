"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

type Props = {
  session: any;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DeleteTitikLokasi({ session }: Props) {
  const { register, handleSubmit, reset } = useForm();
  const [lokasi, setLokasi] = useState<
    { lokasi_id: number; nama_lokasi: string }[]
  >([]);
  const [lokasiList, setLokasiList] = useState<
  { lokasi_id: number; nama_lokasi: string }[]
>([]);

  // Fetch data lokasi dari API
  useEffect(() => {
    const fetchLokasi = async () => {
      const { data, error } = await supabase
        .from("lokasi")
        .select(`lokasi_id, "nama_lokasi"`);

      if (error) {
        console.error("Error fetching lokasi:", error.message);
      } else {
        setLokasiList(
          data.map((lokasi) => ({
            lokasi_id: lokasi.lokasi_id,
            nama_lokasi: lokasi["nama_lokasi"],
          }))
        );
      }
    };

    fetchLokasi();
  }, []);

  // Handle submit data ke API titik-lokasi
  const onSubmit = async (data: any) => {
    const {lokasi_id} = data;
    const res = await fetch(`/api/lokasi?id=${lokasi_id}`, {
      method: "DELETE",
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
        Hapus Lokasi
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
            {lokasiList.map((loc) => (
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

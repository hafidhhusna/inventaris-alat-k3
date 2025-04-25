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
  const [titikLokasiList, setTitikLokasiList] = useState<
    { id_titik_lokasi: number; nama_titik_lokasi: string }[]
  >([]);
  const [selectedLokasiId, setSelectedLokasiId] = useState<number | "">(""); // Set initial state to empty string instead of null

  // Fetch data lokasi dari Supabase
  useEffect(() => {
    async function fetchLokasi() {
      const { data, error } = await supabase.from("lokasi").select("lokasi_id, nama_lokasi");

      if (error) {
        console.error("Gagal Fetch Lokasi: ", error);
        return;
      }
      setLokasi(data || []);
    }

    fetchLokasi();
  }, []);

  // Fetch titik lokasi berdasarkan selectedLokasiId
  useEffect(() => {
    async function fetchTitikLokasi() {
      if (selectedLokasiId === "") return; // Don't fetch if no location selected yet

      const { data, error } = await supabase
        .from("titik_lokasi")
        .select("id_titik_lokasi, nama_titik_lokasi")
        .eq("lokasi_id", selectedLokasiId); // Filter by lokasi_id

      if (error) {
        console.error("Gagal Fetch Titik Lokasi: ", error);
        return;
      }

      setTitikLokasiList(data || []);
    }

    fetchTitikLokasi();
  }, [selectedLokasiId]); // Make sure to trigger fetch when selectedLokasiId changes

  // Handle perubahan lokasi yang dipilih
  const handleLokasiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lokasiId = event.target.value ? Number(event.target.value) : ""; // Set to "" if no selection
    setSelectedLokasiId(lokasiId);
  };

  // Handle submit data ke Supabase untuk menghapus titik lokasi
  const onSubmit = async (data: any) => {
    const { titik_lokasi_id } = data;

    const { error } = await supabase
      .from("titik_lokasi")
      .delete()
      .eq("id_titik_lokasi", titik_lokasi_id); // Delete the specific titik_lokasi

    if (error) {
      alert("Gagal menghapus titik lokasi: " + error.message);
    } else {
      alert("Data Berhasil Dihapus!");
      reset();
      setTitikLokasiList([]); // Clear the list after deletion
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
            value={selectedLokasiId}
            onChange={handleLokasiChange}
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

        {/* Dropdown Titik Lokasi */}
        <div>
          <label className="block text-sm font-medium mb-1">Titik Lokasi</label>
          <select
            {...register("titik_lokasi_id")}
            className="border border-gray-300 p-2 rounded w-full text-sm"
            required
          >
            <option value="">Pilih Titik Lokasi</option>
            {titikLokasiList.map((titik) => (
              <option key={titik.id_titik_lokasi} value={titik.id_titik_lokasi}>
                {titik.nama_titik_lokasi}
              </option>
            ))}
          </select>
        </div>

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

"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { supabase } from "@/lib/supabaseClient";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type FormData = {
  lokasi_id: number;
  nama_titik_lokasi: string;
};

export default function InputTitikLokasiForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [lokasi, setLokasi] = useState<{ id: number; nama_lokasi: string }[]>([]);

  useEffect(() => {
    async function fetchLokasi() {
      const { data, error } = await supabase.from("lokasi").select("id, nama_lokasi");
      if (!error) setLokasi(data || []);
    }
    fetchLokasi();
  }, []);

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from("titik_lokasi").insert([data]);
    if (!error) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-md max-w-md mx-auto">
      <label className="block mb-2">Pilih Lokasi</label>
      <select {...register("lokasi_id")} className="border p-2 w-full mb-4">
        {lokasi.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.nama_lokasi}
          </option>
        ))}
      </select>

      <label className="block mb-2">Nama Titik Lokasi</label>
      <input {...register("nama_titik_lokasi")} className="border p-2 w-full mb-4" />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Simpan
      </button>
    </form>
  );
}

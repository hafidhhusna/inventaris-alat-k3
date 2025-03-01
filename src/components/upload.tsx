"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const UploadForm = () => {
  const [formData, setFormData] = useState({
    nama_item: "",
    nomor_ser: "",
    lokasi: "",
    titik_lokasi: "",
    spesifikasi: "",
    tanggal_pembelian: "",
    pemasok: "",
    PIC: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle perubahan input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle perubahan input file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle submit form dan upload file
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${formData.nama_item.replace(/\s+/g, "_")}_${Date.now()}.${fileExt}`;
      const filePath = `items/${fileName}`;

      // Upload file ke Supabase Storage
      const { data, error } = await supabase.storage.from("test-bucket").upload(filePath, file);

      if (error) {
        console.error("Error uploading file:", error.message);
        setLoading(false);
        return;
      }

      // Dapatkan URL publik gambar
      const { data: publicURLData } = supabase.storage.from("test-bucket").getPublicUrl(filePath);
      imageUrl = publicURLData.publicUrl;
    }

    // Kirim data ke backend
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, gambar: imageUrl }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error saving data:", result.error);
    }

    setLoading(false);
    alert("Data berhasil disimpan!");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <input type="text" name="nama_item" placeholder="Nama Item" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
      <input type="text" name="nomor_ser" placeholder="Nomor Seri" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
      <input type="text" name="lokasi" placeholder="Lokasi" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
      <input type="text" name="titik_lokasi" placeholder="Titik Lokasi" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
      <input type="text" name="spesifikasi" placeholder="Spesifikasi" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
      <input type="date" name="tanggal_pembelian" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
      <input type="text" name="pemasok" placeholder="Pemasok" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
      <input type="text" name="PIC" placeholder="PIC" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />

      <input type="file" onChange={handleFileChange} className="mb-2 p-2 w-full border rounded" />

      <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50">
        {loading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
};

export default UploadForm;

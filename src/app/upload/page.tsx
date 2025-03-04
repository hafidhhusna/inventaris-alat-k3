"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const UploadForm = () => {
  const [formData, setFormData] = useState({
    jenis_sarana: "",
    nama_item: "",
    nomor_ser: "",
    lokasi_id: "",
    id_titik_lokasi: "",
    spesifikasi: "",
    tanggal_pembelian: "",
    pemasok: "",
    PIC: "",
    status_pemasangan: "", // Akan diisi oleh radio button
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle perubahan input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle perubahan input radio button (status pemasangan)
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, status_pemasangan: e.target.value });
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
        alert("Gagal mengunggah file!");
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
      alert("Gagal menyimpan data!");
    } else {
      alert("Data berhasil disimpan!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Tambah Item Baru</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="nama_item" placeholder="Nama Item" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
        <input type="text" name="jenis_sarana" placeholder="Jenis Sarana" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
        <input type="text" name="nomor_ser" placeholder="Nomor Seri" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
        <input type="text" name="lokasi_id" placeholder="Lokasi ID" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
        <input type="text" name="id_titik_lokasi" placeholder="Titik Lokasi ID" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
        <input type="text" name="spesifikasi" placeholder="Spesifikasi" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
        <input type="date" name="tanggal_pembelian" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
        <input type="text" name="pemasok" placeholder="Pemasok" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />
        <input type="text" name="PIC" placeholder="PIC" onChange={handleChange} required className="mb-2 p-2 w-full border rounded" />

        {/* Input Radio Button untuk Status Pemasangan */}
        <div className="mb-2">
          <label className="block font-medium">Status Pemasangan:</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="status_pemasangan"
                value="Terpasang"
                checked={formData.status_pemasangan === "Terpasang"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Terpasang
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status_pemasangan"
                value="Belum Terpasang"
                checked={formData.status_pemasangan === "Belum Terpasang"}
                onChange={handleRadioChange}
                className="mr-2"
              />
              Belum Terpasang
            </label>
          </div>
        </div>

        {/* Upload Gambar */}
        <input type="file" onChange={handleFileChange} className="mb-2 p-2 w-full border rounded" />

        {/* Tombol Submit */}
        <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50">
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;

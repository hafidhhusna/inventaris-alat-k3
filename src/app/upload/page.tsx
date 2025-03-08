"use client";

import { useState, useEffect } from "react";
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
    deskripsi: "",
    lokasi_id: "",
    id_titik_lokasi: "",
    spesifikasi: "",
    tanggal_pembelian: "",
    pemasok: "",
    PIC: "",
    status_pemasangan: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lokasiList, setLokasiList] = useState<
    { lokasi_id: number; nama_lokasi: string }[]
  >([]);
  const [titikLokasiList, setTitikLokasiList] = useState<
    { id_titik_lokasi: number; nama_titik_lokasi: string }[]
  >([]);

  // Fetch daftar lokasi
  useEffect(() => {
    const fetchLokasi = async () => {
      const { data, error } = await supabase
        .from("lokasi")
        .select(`lokasi_id, "nama lokasi"`);

      if (error) {
        console.error("Error fetching lokasi:", error.message);
      } else {
        setLokasiList(
          data.map((lokasi) => ({
            lokasi_id: lokasi.lokasi_id,
            nama_lokasi: lokasi["nama lokasi"],
          }))
        );
      }
    };

    fetchLokasi();
  }, []);

  // Fetch titik lokasi berdasarkan lokasi yang dipilih
  useEffect(() => {
    if (formData.lokasi_id) {
      const fetchTitikLokasi = async () => {
        const { data, error } = await supabase
          .from("titik lokasi")
          .select(`id_titik_lokasi, "nama_titik_lokasi"`)
          .eq("lokasi_id", formData.lokasi_id);

        if (error) {
          console.error("Error fetching titik lokasi:", error.message);
        } else {
          setTitikLokasiList(
            data.map((titik) => ({
              id_titik_lokasi: titik.id_titik_lokasi,
              nama_titik_lokasi: titik["nama_titik_lokasi"],
            }))
          );
        }
      };

      fetchTitikLokasi();
    }
  }, [formData.lokasi_id]);

  // Handle perubahan input form
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Reset titik lokasi jika lokasi berubah
    if (e.target.name === "lokasi_id") {
      setFormData((prev) => ({ ...prev, id_titik_lokasi: "" }));
    }
  };

  // Handle perubahan input file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${formData.nama_item.replace(
        /\s+/g,
        "_"
      )}_${Date.now()}.${fileExt}`;
      const filePath = `items/${fileName}`;

      const { error } = await supabase.storage
        .from("test-bucket")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading file:", error.message);
        alert("Gagal mengunggah file!");
        setLoading(false);
        return;
      }

      const { data: publicURLData } = supabase.storage
        .from("test-bucket")
        .getPublicUrl(filePath);
      imageUrl = publicURLData.publicUrl;
    }

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
        <input
          type="text"
          name="nama_item"
          placeholder="Nama Item"
          onChange={handleChange}
          required
          className="mb-2 p-2 w-full border rounded"
        />

        <select
          name="jenis_sarana"
          value={formData.jenis_sarana}
          onChange={handleChange}
          required
          className="mb-2 p-2 w-full border rounded"
        >
          <option value="" disabled>
            Pilih Jenis Sarana
          </option>
          <option value="sprinkler">Sprinkler</option>
          <option value="APAP">APAP</option>
          <option value="detector">Detector</option>
          <option value="hidran_bangunan">Hidran Bangunan</option>
          <option value="hidran_halaman">Hidran Halaman</option>
          <option value="kotak_p3k">Kotak P3K</option>
          <option value="ruang_mns">Ruang MNS</option>
          <option value="rumah_pompa_hidran">Rumah Pompa Hidran</option>
          <option value="sarana_jalan_keluar">Sarana Jalan Keluar</option>
          <option value="scba">SCBA</option>
          <option value="spill_containment_room">Spill Containment Room</option>
        </select>

        <input
          type="text"
          name="nomor_ser"
          placeholder="Nomor Seri"
          onChange={handleChange}
          required
          className="mb-2 p-2 w-full border rounded"
        />

        <input
          type="text"
          name="deskripsi"
          placeholder="Deskripsi Item"
          onChange={handleChange}
          required
          className="mb-2 p-2 w-full border rounded"
        />

        {/* Dropdown Lokasi */}
        <select
          name="lokasi_id"
          value={formData.lokasi_id}
          onChange={handleChange}
          required
          className="mb-2 p-2 w-full border rounded"
        >
          <option value="" disabled>
            Pilih Lokasi
          </option>
          {lokasiList.map((lokasi) => (
            <option key={lokasi.lokasi_id} value={lokasi.lokasi_id}>
              {lokasi.nama_lokasi}
            </option>
          ))}
        </select>

        {/* Dropdown Titik Lokasi */}
        <select
          name="id_titik_lokasi"
          value={formData.id_titik_lokasi}
          onChange={handleChange}
          required
          className="mb-2 p-2 w-full border rounded"
          disabled={!formData.lokasi_id}
        >
          <option value="" disabled>
            Pilih Titik Lokasi
          </option>
          {titikLokasiList.map((titik) => (
            <option key={titik.id_titik_lokasi} value={titik.id_titik_lokasi}>
              {titik.nama_titik_lokasi}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="spesifikasi"
          placeholder="Spesifikasi"
          onChange={handleChange}
          required
          className="mb-2 p-2 w-full border rounded"
        />
        <input
          type="date"
          name="tanggal_pembelian"
          onChange={handleChange}
          required
          className="mb-2 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="pemasok"
          placeholder="Pemasok"
          onChange={handleChange}
          required
          className="mb-2 p-2 w-full border rounded"
        />
        <input
          type="text"
          name="PIC"
          placeholder="PIC"
          onChange={handleChange}
          required
          className="mb-2 p-2 w-full border rounded"
        />

        <div className="mb-2">
          <label className="block font-medium">Status Pemasangan:</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="status_pemasangan"
                value="Terpasang"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Terpasang
            </label>
            <label>
              <input
                type="radio"
                name="status_pemasangan"
                value="Belum Terpasang"
                onChange={handleChange}
                className="mr-2"
              />{" "}
              Belum Terpasang
            </label>
          </div>
        </div>

        <input
          type="file"
          onChange={handleFileChange}
          className="mb-2 p-2 w-full border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;

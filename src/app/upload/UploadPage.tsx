"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  session: any;
};

const UploadForm = ({ session }: Props) => {
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
    status: "",
    uploadedBy: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lokasiList, setLokasiList] = useState<
    { lokasi_id: number; nama_lokasi: string }[]
  >([]);
  const [titikLokasiList, setTitikLokasiList] = useState<
    { id_titik_lokasi: number; nama_titik_lokasi: string }[]
  >([]);
  const [newLokasiName, setNewLokasiName] = useState("");
  const [newTitikLokasiName, setNewTitikLokasiName] = useState("");

  // Fetch daftar lokasi
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

  // Fetch titik lokasi berdasarkan lokasi yang dipilih
  useEffect(() => {
    if (formData.lokasi_id && formData.lokasi_id !== "new") {
      const fetchTitikLokasi = async () => {
        const { data, error } = await supabase
          .from("titik_lokasi")
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
    } else {
      setTitikLokasiList([]);
    }
  }, [formData.lokasi_id]);

  // Handle perubahan input form
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "lokasi_id") {
      setFormData((prev) => ({
        ...prev,
        lokasi_id: value,
        id_titik_lokasi: "",
      }));
      return;
    }

    if (name === "id_titik_lokasi") {
      setFormData((prev) => ({
        ...prev,
        id_titik_lokasi: value,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    let lokasiId = formData.lokasi_id;
    let titikLokasiId = formData.id_titik_lokasi;

    if (lokasiId === "new" && newLokasiName) {
      const { data, error } = await supabase
        .from("lokasi")
        .insert({ nama_lokasi: newLokasiName })
        .select()
        .single();

      if (error) {
        alert("Gagal Menambah Lokasi Baru : Lokasi Sudah Ada");
        setLoading(false);
        return;
      }

      lokasiId = data.lokasi_id;
    }

    if (titikLokasiId === "new" && newTitikLokasiName) {
      const { data, error } = await supabase
        .from("titik_lokasi")
        .insert({ nama_titik_lokasi: newTitikLokasiName, lokasi_id: lokasiId })
        .select()
        .single();

      if (error) {
        alert("Gagal Menambah Titik Lokasi Baru : Titik Lokasi Sudah Ada");
        setLoading(false);
        return;
      }

      titikLokasiId = data;
    }

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

    console.log("FormData : ", formData);

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        gambar: imageUrl,
        new_lokasi_name: formData.lokasi_id === "new" ? newLokasiName : null,
        new_titik_lokasi_name:
          formData.id_titik_lokasi === "new" ? newTitikLokasiName : null,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Error saving data:", result.error);
      console.log("Response : ", result);
      alert("Gagal menyimpan data!");
    } else {
      alert("Data berhasil disimpan!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
            <Link
              href="/NewElement"
              className="inline-flex items-center justify-center bg-blue-600 text-white text-lg w-10 h-10 rounded-full mb-6 hover:bg-blue-700"
            >
              <FaArrowLeft />
            </Link>
            <h2 className="text-lg font-bold mb-4">Tambah Item Baru</h2>

            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center relative">
                <input
                  type="text"
                  name="nama_item"
                  placeholder="Nama Item"
                  onChange={handleChange}
                  required
                  className="mb-2 p-2 w-full border rounded"
                />
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Nama lengkap sarana tanggap darurat yang akan diinventarisasi</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center relative">
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
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Jenis kategori sarana (misal : APAR, SCBA, Sprinkler, Hidran, dll.)</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center relative">
                <input
                  type="text"
                  name="nomor_ser"
                  placeholder="Nomor Seri"
                  onChange={handleChange}
                  required
                  className="mb-2 p-2 w-full border rounded"
                />
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Nomor identifikasi unik dari pabrikan atau kode internal</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center relative">
                <input
                  type="text"
                  name="deskripsi"
                  placeholder="Deskripsi Item"
                  onChange={handleChange}
                  required
                  className="mb-2 p-2 w-full border rounded"
                />
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Penjelasan singkat terkait kondisi, fungsi tambahan, atau spesifikasi umum</p>
                  </div>
                </div>
              </div>

              {/* Dropdown Lokasi */}
              <div className="flex items-center justify-center relative">
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
                  <option value="new">+ Tambah Lokasi Baru</option>
                </select>
                {/* Input Lokasi Baru */}
                {formData.lokasi_id === "new" && (
                  <input
                    type="text"
                    placeholder="Masukkan Lokasi Baru"
                    value={newLokasiName}
                    onChange={(e) => setNewLokasiName(e.target.value)}
                    className="mb-2 p-2 w-full border rounded"
                    required
                  />
                )}
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Area umum penempatan sarana (misal: Bangunan A, Gudang, Halaman Depan)</p>
                  </div>
                </div>
              </div>

              {/* Dropdown Titik Lokasi */}
              <div className="flex items-center justify-center relative">
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
                  <option value="new">+ Tambah Titik Lokasi Baru</option>
                </select>
                {/* Input Titik Lokasi Baru */}
                {formData.id_titik_lokasi === "new" && (
                  <input
                    type="text"
                    placeholder="Masukkan Titik Lokasi Baru"
                    value={newTitikLokasiName}
                    onChange={(e) => setNewTitikLokasiName(e.target.value)}
                    className="mb-2 p-2 w-full border rounded"
                    required
                  />
                )}
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Titik detail penempatan (misal: Lantai 2 koridor timur, dekat lift)</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center relative">
                <input
                  type="text"
                  name="spesifikasi"
                  placeholder="Spesifikasi"
                  onChange={handleChange}
                  required
                  className="mb-2 p-2 w-full border rounded"
                />
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Informasi teknis seperti kapasitas, tekanan, model, tipe, atau ukuran</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center relative">
                <input
                  type="date"
                  name="tanggal_pembelian"
                  onChange={handleChange}
                  required
                  className="mb-2 p-2 w-full border rounded"
                />
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Tanggal pemasangan atau pembelian sarana tanggap darurat</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center relative">
                <input
                  type="text"
                  name="pemasok"
                  placeholder="Pemasok"
                  onChange={handleChange}
                  required
                  className="mb-2 p-2 w-full border rounded"
                />
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Nama vendor atau supplier penyedia item</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center relative">
                <input
                  type="text"
                  name="PIC"
                  placeholder="PIC"
                  onChange={handleChange}
                  required
                  className="mb-2 p-2 w-full border rounded"
                />
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Person in Charge - nama petugas atau penanggung jawab untuk sarana tersebut</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-start relative">
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
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Menandai apakah sarana sudah terpasang atau belum</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mb-2 p-2 w-full border rounded"
                />
                <div className="relative group ml-2">
                  <IoMdInformationCircle className="text-[0.7vw] cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 max-w-xs whitespace-normal text-center z-10 pointer-events-none">
                    <p>Opsi unggah foto atau dokumen pendukung (bukti pemasangan, sertifikat, dll.)</p>
                  </div>
                </div>
              </div>


              <button
                type="submit"
                disabled={loading}
                className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Submit"}
              </button>
            </form>
          </div>
    </div>
  );
};

export default UploadForm;

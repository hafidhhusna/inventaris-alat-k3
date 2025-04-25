"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
// import Camera from "@/components/Camera";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Lokasi = {
  lokasi_id: number;
  nama_lokasi: string;
};

type TitikLokasi = {
  id_titik_lokasi: number;
  nama_titik_lokasi: string;
};

const ItemsForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [lokasiList, setLokasiList] = useState<Lokasi[]>([]);
  const [titikLokasiList, setTitikLokasiList] = useState<TitikLokasi[]>([]);
  const [selectedLokasi, setSelectedLokasi] = useState("");
  const [jenisSarana, setJenisSarana] = useState<string>("");
  const [columnName, setColumnName] = useState<Record<string, string>[]>([]);
  const [selectedValue, setSelectedValue] = useState<{
    [key: string]: boolean | number | string | null;
  }>({});
  const [textAreaValue, setTextAreaValue] = useState<Record<string, string>>(
    {}
  );
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const handleTextareaChange = (columnName: string, value: string) => {
    setTextAreaValue((prev) => ({
      ...prev,
      [columnName]: value,
    }));
  };

  // Fetch jenis_sarana berdasarkan id_item
  useEffect(() => {
    const fetch_jenis_sarana = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("item")
        .select("jenis_sarana")
        .eq("id_item", id)
        .single();

      if (error) {
        console.error("Error fetching item: ", error);
      } else {
        setJenisSarana(data?.jenis_sarana || "Unknown");
      }
    };

    fetch_jenis_sarana();
  }, [id]);

  useEffect(() => {
    const fetchLokasi = async () => {
      try {
        const response = await fetch("/api/titik-lokasi", {
          method : 'GET'
        });
        const result: { data: Lokasi[] } = await response.json();

        if (!response.ok) {
          throw new Error("Gagal mengambil data lokasi");
        }

        setLokasiList(result.data);
        // console.log("lokasi:", result.data);
      } catch (error) {
        console.error("Error fetching lokasi:", error);
      }
    };

    fetchLokasi();
  }, []);

  // Fetch titik lokasi berdasarkan lokasi_id
  useEffect(() => {
    if (selectedLokasi) {
      const fetchTitikLokasi = async () => {
        try {
          const response = await fetch(
            `/api/titik-lokasi?lokasi_id=${selectedLokasi}`, {
              method : 'GET'
            }
          );
          const result = await response.json();

          if (!response.ok) {
            throw new Error(
              result.error || "Gagal mengambil data titik lokasi"
            );
          }

          setTitikLokasiList(result.data);

          if (result.data.length === 1) {
            setSelectedValue((prev) => ({
              ...prev,
              id_titik_lokasi: result.data[0].id_titik_lokasi,
            }));
          }
          // console.log("titik lokasi:", result.data);
        } catch (error) {
          console.error("Error fetching titik lokasi:", error);
        }
      };

      fetchTitikLokasi();
    } else {
      setTitikLokasiList([]);
    }
  }, [selectedLokasi]);

  useEffect(() => {
    if (!jenisSarana) return;

    const table_name = `inspeksi_${jenisSarana}`;

    const fetchColumnNames = async () => {
      const { data, error } = await supabase.rpc("get_column_info", {
        table_name: table_name,
      });

      console.log(data);

      if (error) {
        console.error(error);
        console.log(error.message);
      } else {
        setColumnName(data);
      }
    };

    fetchColumnNames();
  }, [jenisSarana]);

  //Upload Gambar
  const uploadImage = async (imageBase64: string) => {
    if (!imageBase64) return null;

    const fileName = `image_${Date.now()}.png`; // Buat nama file unik
    const filePath = `inspeksi/${fileName}`;

    // Convert Base64 ke Blob
    const blob = await (await fetch(imageBase64)).blob();

    // Upload ke Supabase Storage
    const { data, error } = await supabase.storage
      .from("test-bucket")
      .upload(filePath, blob);

    if (error) {
      console.error("Error uploading image:", error.message);
      return null;
    }

    console.log("Data Gambar : ", data);

    // Dapatkan URL gambar
    const { data: publicUrl } = supabase.storage
      .from("test-bucket")
      .getPublicUrl(filePath);
    console.log("Image URL : ", publicUrl.publicUrl);
    return publicUrl.publicUrl;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);

      // Optional: If uploadImage needs a base64 string instead of a File
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCapturedImage(base64String);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Mengubah nilai dropdown menjadi boolean (Yes = true, No = false)
  const handleDropdownChange = (
    columnName: string,
    value: string,
    columnDataType: string
  ) => {
    console.log(
      `Column: ${columnName}, Value: ${value}, ColumnDataType: ${columnDataType}`
    );

    if (columnName === "lokasi_id") {
      setSelectedLokasi(value); // Update selectedLokasi when Lokasi Id changes

      // Reset id_titik_lokasi when lokasi_id changes
      setSelectedValue((prev) => ({
        ...prev,
        id_titik_lokasi: "", // Clear previous selection
      }));
    }

    setSelectedValue((prev) => ({
      ...prev,
      [columnName]:
        columnDataType === "boolean"
          ? value === "Yes"
          : columnDataType === "integer"
          ? parseInt(value)
          : value,
    }));
  };

  // Format nama kolom agar lebih readable
  const formatColumnName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Handle submit form ke database Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jenisSarana || !id) {
      console.error("Jenis Sarana atau ID tidak tersedia");
      return;
    }

    const table_name = `inspeksi_${jenisSarana}`;

    // let imageUrl = null;
    let uploadedUrl = null;

    // Check if image was captured
    if (capturedImage) {
      uploadedUrl = await uploadImage(capturedImage);
    }

    setImageUrl(uploadedUrl);
    console.log("Final Image URL : ", uploadedUrl);

    const dataToInsert: { [key: string]: string | number | boolean | null } = {
      id_item: id,
      gambar: uploadedUrl,
      ...selectedValue,
    };

    console.log("DataToInserttt : ", dataToInsert);
    columnName.forEach(
      (column) => {
        if (
          column.column_name !== "id_item" &&
          column.column_name !== "id_inspeksi" &&
          column.column_name !== "createdAt" &&
          column.column_name !== "gambar"
          // column.column_name !== "id_titik_lokasi" &&
          // column.column_name !== "lokasi_id"
        ) {
          let value = selectedValue[column.column_name];

          if (column.data_type === "character varying") {
            value = textAreaValue[column.column_name] || "";
          }

          if (column.data_type === "integer" && typeof value === "string") {
            value = parseInt(value);
          } else if (
            column.data_type === "boolean" &&
            typeof value === "string"
          ) {
            value = value === "Yes";
          }
          dataToInsert[column.column_name] = value ?? null; // Jika tidak dipilih, simpan null
        }
      },
      [columnName]
    );

    console.log("Data to Insert : ", dataToInsert); // Debugging sebelum insert

    const { error } = await supabase.from(table_name).insert([dataToInsert]);
    // .select() for debugging only

    if (error) {
      console.error("Error inserting data: ", error.message);
    } else {
      // console.log("Data inserted successfully", data);
      alert("Data berhasil disimpan!");
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#fcfcfc] flex flex-col items-center">
      {/* Header */}
      <div className="w-full p-4 flex items-center justify-between bg-white shadow-md">
        <Image
          src="/images/LOGO INSPEKTRA PLUS 3.png"
          width={10000}
          height={10000}
          alt="logo Inspektra"
          className="w-32 h-auto sm:w-[9.427vw] sm:h-[3.281vw]"
        />
        <Link
          href="/Tracker"
          className="bg-[#51B5DD] rounded-full px-4 py-2 sm:px-[2vw] sm:py-[0.5vw] text-white text-sm sm:text-[1.042vw] font-bold"
        >
          Tutup Form
        </Link>
      </div>

      {/* Title */}
      <div className="text-center mt-6 sm:mt-[2vw]">
        <h1 className="text-xl sm:text-[2.083vw] font-semibold bg-white px-4 py-2 rounded shadow-md">
          Inspeksi {formatColumnName(jenisSarana)}
        </h1>
        <h2 className="text-base sm:text-[1.302vw] mt-2">
          Formulir Inspeksi Alat Pemadam Api
        </h2>
      </div>

      {/* Separator */}
      <div className="w-11/12 sm:w-[48.125vw] h-[1px] bg-black my-4"></div>

      <div className="w-11/12 sm:w-[48.125vw] flex justify-evenly py-2 sm:py-[0.78vw] text-base sm:text-[1.302vw] font-medium">
        <span>Elemen</span>
        <span>Status Inspeksi</span>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-11/12 sm:w-[48.125vw] flex flex-col gap-4 my-4"
      >
        {columnName
          .filter(
            (column) =>
              column.column_name !== "id_item" &&
              column.column_name !== "id_inspeksi" &&
              column.column_name !== "createdAt"
          )
          .map((column, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between gap-2 items-start sm:items-center"
            >
              {column.data_type === "boolean" && (
                <Dropdown
                  value={
                    selectedValue[column.column_name] === true
                      ? "Yes"
                      : selectedValue[column.column_name] === false
                      ? "No"
                      : "Status Condition"
                  }
                  onChange={(e) =>
                    handleDropdownChange(
                      column.column_name,
                      e.target.value,
                      column.data_type
                    )
                  }
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              )}

              {column.column_name === "lokasi_id" && (
                <Dropdown
                  value={
                    selectedValue[column.column_name]
                      ? String(selectedValue[column.column_name])
                      : "Pilih Lokasi"
                  }
                  onChange={(e) =>
                    handleDropdownChange(
                      column.column_name,
                      e.target.value,
                      column.data_type
                    )
                  }
                  options={lokasiList.map((lokasi) => ({
                    label: lokasi.nama_lokasi,
                    value: String(lokasi.lokasi_id),
                  }))}
                />
              )}

              {column.column_name === "id_titik_lokasi" && (
                <Dropdown
                  value={
                    selectedValue[column.column_name]
                      ? String(selectedValue[column.column_name])
                      : "Pilih Titik Lokasi"
                  }
                  onChange={(e) =>
                    handleDropdownChange(
                      column.column_name,
                      e.target.value,
                      column.data_type
                    )
                  }
                  options={titikLokasiList
                    .filter(() => {
                      const lokasi = lokasiList.find(
                        (l) => l.lokasi_id === selectedValue["lokasi_id"]
                      );
                      return lokasi
                        ? lokasi.lokasi_id === selectedValue["lokasi_id"]
                        : false;
                    })
                    .map((titikLokasi) => ({
                      label: titikLokasi.nama_titik_lokasi,
                      value: String(titikLokasi.id_titik_lokasi),
                    }))}
                />
              )}

              {column.data_type === "character varying" && (
                <textarea
                  key={column.column_name}
                  value={textAreaValue[column.column_name] || ""}
                  onChange={(e) =>
                    handleTextareaChange(column.column_name, e.target.value)
                  }
                  placeholder="Insert text here"
                  className="w-full sm:w-2/3 h-24 p-2 border border-black rounded"
                />
              )}

              {column.column_name == "gambar" && (
                // <Camera onCapture={(image) => setCapturedImage(image)} />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mb-2 p-2 w-full border rounded"
                />
              )}

              <span className="text-sm sm:text-[1.302vw] font-medium">
                {formatColumnName(column.column_name)}
              </span>
            </div>
          ))}

        <button
          type="submit"
          className="self-center bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-2 px-6 rounded text-sm sm:text-base"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ItemsForm;

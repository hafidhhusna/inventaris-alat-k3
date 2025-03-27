"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Camera from "@/components/Camera";

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
        const response = await fetch("/api/titik-lokasi");
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
            `/api/titik-lokasi?lokasi_id=${selectedLokasi}`
          );
          const result = await response.json();

          if (!response.ok) {
            throw new Error(
              result.error || "Gagal mengambil data titik lokasi"
            );
          }

          setTitikLokasiList(result.data);
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
    if (capturedImage) {
      const uploadedUrl = await uploadImage(capturedImage);
      setImageUrl(uploadedUrl);
    }
    console.log("Final Image URL : ", imageUrl);

    const dataToInsert: { [key: string]: string | number | boolean | null } = {
      id_item: id,
      gambar: imageUrl,
      ...selectedValue,
    };

    columnName.forEach(
      (column) => {
        if (
          column.column_name !== "id_item" &&
          column.column_name !== "id_inspeksi" &&
          column.column_name !== "createdAt"
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
    <div className="w-screen h-screen overflow-x-hidden bg-[#fcfcfc] flex flex-col items-center">
      {/* Header */}
      <div className="w-full h-[5.156vw] p-[2vw] flex items-center justify-between bg-[#fff]">
        <Image
          src="/images/LOGO INSPEKTRA PLUS 3.png"
          width={10000}
          height={10000}
          alt="logo Inspektra"
          className="w-[9.427vw] h-[3.281vw]"
        />
        <Link
          href="/Tracker"
          className="w-[13.802vw] h-[2.656vw] bg-[#51B5DD] rounded-[2.5vw] text-[1.042vw] text-white flex items-center justify-center font-bold"
        >
          Tutup Form
        </Link>
      </div>

      {/* Title */}
      <h1 className="p-[1vw] drop-shadow-md bg-[#fff] mt-[2vw] rounded-[0.521vw] text-[2.083vw]">
        Inspeksi {formatColumnName(jenisSarana)}
      </h1>
      <h1 className="mt-[1vw] text-[1.302vw]">
        Formulir Inspeksi Alat Pemadam Api
      </h1>

      {/* Separator */}
      <div className="w-[48.125vw] h-[0.052vw] bg-black mt-[0.5vw]"></div>
      <div className="w-[48.125vw] flex justify-evenly py-[0.78vw] text-[1.302vw]">
        <h1>Elemen</h1>
        <h1>Status Inspeksi</h1>
      </div>

      {/* Formulir */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[48.125vw] my-[2vw]"
      >
        {columnName
          .filter(
            (column) =>
              column.column_name !== "id_item" &&
              column.column_name !== "id_inspeksi" &&
              column.column_name !== "createdAt"
            // column.column_name !== "id_titik_lokasi" &&
            // column.column_name !== "lokasi_id"
          )
          .map((column, index) => {
            return (
              <div
                key={index}
                className="flex justify-between mb-[1vw] relative"
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
                        : "Status Condition"
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
                        : "Status Condition"
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
                        // Cari lokasi_id dari lokasiList yang sesuai dengan id_titik_lokasi
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
                    className="h-[8vw] py-[0.2vw] px-[0.4vw] border border-black rounded-[0.5vw]"
                  />
                )}

                {column.column_name == "gambar" && (
                  <Camera onCapture={(image) => setCapturedImage(image)} />
                )}
                <h1 className="text-[1.302vw]">
                  {formatColumnName(column.column_name)}
                </h1>
              </div>
            );
          })}
        <button
          type="submit"
          className="w-[8vw] h-[2vw] bg-red-600 text-white rounded-[0.5vw] font-bold hover:bg-red-700 active:bg-red-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ItemsForm;

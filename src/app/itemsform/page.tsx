"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
// import { table } from "console";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ItemsForm = () => {
  const [selected, setSelected] = useState("Status Condition");
  const [jenisSarana, setJenisSarana] = useState<string | null>(null);
  // const [columnName, setColumnName] = useState<any[]>([]);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

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
    if (!jenisSarana) return;

    const table_name = `inspeksi_${jenisSarana}`;
    // console.log(table_name);

    const fetch_table_name = async () => {
      const { data, error } = await supabase
        .from(table_name)
        .select("*")
        .limit(1); // Fetch only 1 row to save bandwidth

      if (error) {
        console.error("Error fetching columns: ", error);
      } else if (data && data.length > 0) {
        const columns = Object.keys(data[0]);
        console.log("Column Names: ", columns);
      } else {
        console.warn("Table is empty — no rows to extract columns from.");
      }
    };

    fetch_table_name();
  }, [jenisSarana]);

  return (
    <div className="w-screen h-screen bg-[#fcfcfc] flex flex-col items-center">
      <div className="w-full h-[5.156vw] p-[2vw] flex items-center justify-between bg-[#fff]">
        <Image
          src="/images/LOGO INSPEKTRA PLUS 3.png"
          width={10000}
          height={10000}
          alt="logo Inspektra"
          className="w-[9.427vw] h-[3.281vw]"
        />
        <button className="w-[13.802vw] h-[2.656vw] bg-[#51B5DD] rounded-[2.5vw] text-[1.042vw] text-white">
          Tutup Form
        </button>
      </div>
      <h1 className="p-[1vw] drop-shadow-md bg-[#fff] mt-[2vw] rounded-[0.521vw] text-[2.083vw]">
        Inspeksi Alat Pemadam Api Portabel (APAP)
      </h1>
      <h1 className="mt-[1vw] text-[1.302vw]">
        Formulir Inspeksi Alat Pemadam Api
      </h1>
      <div className="w-[48.125vw] h-[0.052vw] bg-black mt-[0.5vw]"></div>
      <div className="w-[48.125vw] flex justify-evenly py-[0.78vw] text-[1.302vw]">
        <h1>Elemen</h1>
        <h1>Status Inspeksi</h1>
      </div>
      <div className="w-[48.125vw] h-[0.052vw] bg-black"></div>
      <div className="flex w-[48.125vw] items-center justify-evenly my-[2vw]">
        <Dropdown
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
        />
        <h1 className="text-[1.302vw] mr-[3.5vw]">Lokasi</h1>
        <p>id item: {id}</p>
        <p>Jenis Sarana: {jenisSarana}</p>
        {/* <p>Nama Kolom: {JSON.stringify(columnName)}</p> */}
      </div>
    </div>
  );
};

export default ItemsForm;

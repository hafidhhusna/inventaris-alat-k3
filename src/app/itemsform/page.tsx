"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ItemsForm = () => {
  const [jenisSarana, setJenisSarana] = useState<string>("");
  const [columnName, setColumnName] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState<{ [key: string]: string }>(
    {}
  );

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

    const fetchColumnNames = async () => {
      const { data, error } = await supabase.rpc("get_column_names", {
        table_name: table_name,
      });

      if (error) {
        console.error(error);
      } else {
        setColumnName(data);
      }
      console.log(data, table_name);
    };

    fetchColumnNames();
  }, [jenisSarana]);

  const handleDropdownChange = (columnName: string, value: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [columnName]: value,
    }));
  };

  const formatColumnName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSubmit = () => {
    return;
  };

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
        <Link
          href="/Tracker"
          className="w-[13.802vw] h-[2.656vw] bg-[#51B5DD] rounded-[2.5vw] text-[1.042vw] text-white flex items-center justify-center font-bold"
        >
          Tutup Form
        </Link>
      </div>
      <h1 className="p-[1vw] drop-shadow-md bg-[#fff] mt-[2vw] rounded-[0.521vw] text-[2.083vw]">
        Inspeksi {formatColumnName(jenisSarana)}
      </h1>
      <h1 className="mt-[1vw] text-[1.302vw]">
        Formulir Inspeksi Alat Pemadam Api
      </h1>
      <div className="w-[48.125vw] h-[0.052vw] bg-black mt-[0.5vw]"></div>
      <div className="w-[48.125vw] flex justify-evenly py-[0.78vw] text-[1.302vw]">
        <h1>Elemen</h1>
        <h1>Status Inspeksi</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[48.125vw] my-[2vw]"
      >
        {columnName
          .filter(
            (column) =>
              column.column_name !== "id_item" &&
              column.column_name !== "id_inspeksi"
          )
          .map((column, index) => {
            return (
              <div
                key={index}
                className="flex justify-between mb-[1vw] relative"
              >
                <Dropdown
                  value={
                    selectedValue[column.column_name] || "status condition"
                  }
                  onChange={(e) =>
                    handleDropdownChange(column.column_name, e.target.value)
                  }
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
                <h1 className="text-[1.302vw]">
                  {formatColumnName(column.column_name)}
                </h1>
              </div>
            );
          })}
        <button
          type="submit"
          className="w-[8vw] bg-red-700 text-white rounded-[0.5vw]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ItemsForm;

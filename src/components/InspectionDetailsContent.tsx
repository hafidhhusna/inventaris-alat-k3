"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const InspectionDetails = () => {
  const [jenisSarana, setJenisSarana] = useState<string>("");
  const [columnName, setColumnName] = useState<Record<string, string>[]>([]);
  const [items, setItems] = useState<Record<string, any[]>>({});
  // const [id, setId] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  console.log("Fetching data for ID:", id);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log("id:", id);
        const response = await fetch(`/api/rekapitulasi-inspeksi/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error : ${response.status}`);
        }
        const data = await response.json();
        if (data) {
          setItems(data);
          console.log("data:", data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

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
    // console.log(typeof jenisSarana);
  }, [id]);

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

  const formatColumnName = (name: string) => {
    console.log(columnName);
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="w-screen h-screen">
      <h1 className="w-full flex items-center justify-center font-bold text-[3vw]">
        {formatColumnName(jenisSarana)}
      </h1>
      {Object.keys(items).map((tableName, index) => (
        <div key={index}>
          <table className="border mt-2">
            <thead>
              <tr className="bg-gray-100">
                {Array.isArray(items[tableName]) &&
                  items[tableName].length > 0 &&
                  Object.keys(items[tableName][0]).map((key, idx) => (
                    <th key={idx} className="border px-4 py-2">
                      {key.replace(/_/g, " ")}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(items[tableName]) ? (
                items[tableName].map(
                  (row: Record<string, any>, rowIndex: number) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex} className="border px-4 py-2">
                          {String(value).startsWith("https:") ? (
                            <Image
                              src={String(value)}
                              alt="gambar barang"
                              width={200}
                              height={200}
                              className="w-[10vw] h-[3vw]"
                            />
                          ) : (
                            String(value)
                          )}
                        </td>
                      ))}
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td className="px-[1vw] py-[4vw] font-bold text-[2vw] text-red-500">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
      {/* {columnName.map((item, index) => (
        <div key={index}>{item.column_name}</div>
      ))} */}
    </div>
  );
};

export default InspectionDetails;

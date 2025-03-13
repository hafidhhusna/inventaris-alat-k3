"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const InspectionDetails = () => {
  const [jenisSarana, setJenisSarana] = useState<string>("");
  const [columnName, setColumnName] = useState<Record<string, string>[]>([]);
  const [items, setItems] = useState<Record<string, string>[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`/api/rekapitulasi-inspeksi/${id}`);
        const data = await response.json();
        // console.log(data);
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
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="w-screen h-screen">
      <h1 className="w-full flex items-center justify-center font-bold text-[3vw]">
        {jenisSarana}
      </h1>
      {Object.keys(items).map((tableName, index) => (
        <div key={index}>
          <h2 className="font-bold text-lg">{tableName}</h2>
          <table className="border mt-2">
            <thead>
              <tr>
                {items[tableName].length > 0 &&
                  Object.keys(items[tableName][0]).map((key, idx) => (
                    <th key={idx} className="border px-4 py-2">
                      {key.replace(/_/g, " ")}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {items[tableName].map(
                (row: Record<string, any>, rowIndex: number) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex} className="border px-4 py-2">
                        {String(value)}
                      </td>
                    ))}
                  </tr>
                )
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

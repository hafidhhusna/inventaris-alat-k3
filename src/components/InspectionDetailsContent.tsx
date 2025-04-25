"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const InspectionDetails = () => {
  const [jenisSarana, setJenisSarana] = useState<string>("");
  const [columnName, setColumnName] = useState<Record<string, string>[]>([]);
  const [items, setItems] = useState<Record<string, any[]>>({});
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortColumn, setSortColumn] = useState<string>("createdAt");
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = (url : string) => {
    setPreviewImageUrl(url);
    setShowModal(true);
  }

  const closeModal = () => {
    setPreviewImageUrl(null);
    setShowModal(false);
  }

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`/api/rekapitulasi-inspeksi/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`Error : ${response.status}`);

        const data = await response.json();
        if (data) setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [id]);

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

      if (error) {
        console.error(error);
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

  const handleSort = (column: string) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    setSortColumn(column);

    const sortedItems = { ...items };

    Object.keys(sortedItems).forEach((table) => {
      if (Array.isArray(sortedItems[table])) {
        sortedItems[table] = [...sortedItems[table]].sort((a, b) => {
          const aVal = a[column];
          const bVal = b[column];

          if (!aVal || !bVal) return 0;

          const aDate = new Date(aVal);
          const bDate = new Date(bVal);

          return newOrder === "asc"
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        });
      }
    });

    setItems(sortedItems);
  };

  return (
    <div className="w-screen h-screen px-4 py-6 relative">
      <Link
        href="/Tracker"
        className="bg-blue-600 text-black text-[1.5vw] sm:text-base w-[2vw] h-[2vw] rounded-full"
      >
        <FaArrowLeft />
      </Link>
      <h1 className="w-full text-center font-bold text-[8vw] md:text-[3vw] mb-2">
        {formatColumnName(jenisSarana)}
      </h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleSort("createdAt")}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Sort by Created At ({sortOrder === "asc" ? "⬆️" : "⬇️"})
        </button>
      </div>

      {Object.keys(items).map((tableName, index) => (
        <div key={index}>
          <table className="border w-full">
            <thead>
              <tr className="bg-gray-100">
                {Array.isArray(items[tableName]) &&
                  items[tableName].length > 0 &&
                  Object.keys(items[tableName][0]).map((key, idx) => (
                    <th key={idx} className="border px-4 py-2 text-sm">
                      {key.replace(/_/g, " ")}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(items[tableName]) ? (
                items[tableName].map(
                  (row: Record<string, any>, rowIndex: number) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex} className="border px-4 py-2 text-sm">
                          {String(value).startsWith("https:") ? (
                            <button
                              onClick={() => openModal(String(value))}
                              className="text-blue-500 underline hover:text-blue-700"
                              >
                                Show Image
                              </button>
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
                  <td
                    colSpan={100}
                    className="px-[1vw] py-[4vw] font-bold text-[2vw] text-red-500 text-center"
                  >
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
      {showModal && previewImageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-[90vw] max-h-[90vh] relative">
            <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
            >
              x
            </button>
            <Image
              src={previewImageUrl}
              alt="Preview"
              width={800}
              height={800}
              className="object-contain max-w-full max-h-[80vh]"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionDetails;

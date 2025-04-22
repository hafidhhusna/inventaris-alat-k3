"use client";

import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { RiUploadLine } from "react-icons/ri";
import { fetchData } from "next-auth/client/_utils";

const ITEMS_PER_PAGE = 8;

interface Item {
  id_item: number;
  nama_item: string;
  jenis_sarana: string;
  lokasi: string;
  gambar: string;
  deskripsi: string;
  nomor_seri: string | number;
  nama_lokasi?: string;
  tanggal_pembelian: string;
  status_pemasangan: boolean;
  PIC: string;
  titik_lokasi?: string;
  pemasok: string;
  spesifikasi: string;
}

type Props = {
  session: any;
};

const AdminApproval = ({ session }: Props) => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch items from API
  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin-approval");
      const data = await response.json();
      if (data.success) {
        setItems(data.items);
        console.log("Data in FE : ", data.items);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) =>
    item.nama_item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.jenis_sarana.includes(searchQuery.toLowerCase())
  );

  // Total Pages
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStatusChange = async(id: number, newStatus : "APPROVED" | REJECTED) => {
    setLoading(true);
    try{
      const res = await fetch(`api/items/${id}/status`,{
        method : "PATCH",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({newStatus}),
      });

      const data = await res.json();
      if(data.success){
        alert(`Status updated to ${newStatus}`);
        fetchItems();
      } else {
        alert(data.error || "Gagal mengubah status");
      }
    } catch(error){
      console.error("Status Update Error : ", error)
      alert("Update Status Error")
    }
  }

  const handleSortByDate = () => {
    const sortedItems = [...items].sort((a, b) => {
      const dateA = new Date(a.tanggal_pembelian).getTime();
      const dateB = new Date(b.tanggal_pembelian).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setItems(sortedItems);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Function to determine pagination numbers
  const getPaginationRange = () => {
    if (totalPages <= 3)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage >= totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white text-black">
      <div className="absolute">
        <NavBar session={session} />
      </div>
      <Header
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1); // reset to page 1 on new search
        }}
      />
      <div className="px-[10vw] pt-[1vw]">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4 gap-2">
          <h1 className="md:text-[2vw] text-[4vw] font-bold">Admin Approval</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-start">
            <button
              onClick={handleSortByDate}
              className="bg-gray-200 text-black px-2 md:px-4 py-2 rounded-full md:text-sm hover:bg-gray-300 w-full sm:w-auto"
            >
              Sort by Tanggal Pembelian ({sortOrder === "asc" ? "⬆️" : "⬇️"})
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center">Tidak ada item tersedia.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border">No</th>
                  <th className="px-4 py-2 border">Nama Item</th>
                  <th className="px-4 py-2 border">Jenis Sarana</th>
                  <th className="px-4 py-2 border">Nomor Seri</th>
                  <th className="px-4 py-2 border">Lokasi</th>
                  <th className="px-4 py-2 border">Titik Lokasi</th>
                  <th className="px-4 py-2 border">Spesifikasi</th>
                  <th className="px-4 py-2 border">Tanggal Pembelian</th>
                  <th className="px-4 py-2 border">Pemasok</th>
                  <th className="px-4 py-2 border">PIC</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item, index) => (
                  <tr key={item.id_item} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-4 py-2 border">{item.nama_item}</td>
                    <td className="px-4 py-2 border">{item.jenis_sarana}</td>
                    <td className="px-4 py-2 border">{item.nomor_seri}</td>
                    <td className="px-4 py-2 border">{item.nama_lokasi}</td>
                    <td className="px-4 py-2 border">{item.titik_lokasi}</td>
                    <td className="px-4 py-2 border">{item.spesifikasi}</td>
                    <td className="px-4 py-2 border">
                      {item.tanggal_pembelian}
                    </td>
                    <td className="px-4 py-2 border">{item.pemasok}</td>
                    <td className="px-4 py-2 border">{item.PIC}</td>
                    <td className="px-4 py-2 border">
                      {item.status_pemasangan ? "Terpasang" : "Belum"}
                    </td>
                    <td className="px-4 py-2 border flex flex-col justify-center items-center">
                      <button
                        onClick={() => handleStatusChange(item.id_item, "APPROVED")}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(item.id_item, "REJECTED")} 
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>

              {getPaginationRange().map((page, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPages > 3 && currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default AdminApproval;

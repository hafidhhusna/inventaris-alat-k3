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
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { RiUploadLine } from "react-icons/ri";
import { useQRCode } from "next-qrcode";

const ITEMS_PER_PAGE = 8;

interface Item {
  id_item: number;
  nama_item: string;
  lokasi: string;
  gambar: string;
  deskripsi: string;
  nomor_ser: string;
  nama_lokasi?: {
    nama_lokasi: string;
  };
  tanggal_pembelian: string;
  status_pemasangan: boolean;
  PIC : string;
  titik_lokasi : number;
  pemasok: string;
  spesifikasi : string;
}

const TrackerPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const { Canvas } = useQRCode();

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
        if (data.success) {
          setItems(data.items);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Total Pages
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  // Slice items for current page
  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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

  // console.log(selectedItem);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white text-black">
      <div className="absolute">
        <NavBar/>
      </div>
      <Header />
      <div className="px-[10vw] pt-[1vw]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[2vw] font-bold">Data Items (Inspection Element)</h1>
          <Link
            href="/NewElement"
            className="bg-[#37BBCB] text-white px-4 py-2 rounded-full flex items-center"
          >
            <RiUploadLine className="mr-2" />
            Tambah Item
          </Link>
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
                    <td className="px-4 py-2 border">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                    <td className="px-4 py-2 border">{item.nama_item}</td>
                    <td className="px-4 py-2 border">{item.nomor_ser}</td>
                    <td className="px-4 py-2 border">{item.lokasi}</td>
                    <td className="px-4 py-2 border">{item.titik_lokasi}</td>
                    <td className="px-4 py-2 border">{item.spesifikasi}</td>
                    <td className="px-4 py-2 border">{item.tanggal_pembelian}</td>
                    <td className="px-4 py-2 border">{item.pemasok}</td>
                    <td className="px-4 py-2 border">{item.PIC}</td>
                    <td className="px-4 py-2 border">
                      {item.status_pemasangan ? "Terpasang" : "Belum"}
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setIsOpen(true);
                        }}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setQrOpen(true);
                        }}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                      >
                        QR
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
  
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={
                      currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                    }
                  />
                </PaginationItem>
  
                {getPaginationRange().map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      className={
                        currentPage === page ? "bg-gray-300 font-bold" : ""
                      }
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
  
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
  
        {/* Detail Modal */}
        {isOpen && selectedItem && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white w-[60vw] p-6 rounded-lg relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-2xl"
              >
                <IoIosClose />
              </button>
              <h2 className="text-xl font-bold mb-2">{selectedItem.nama_item}</h2>
              <p><strong>Nomor Seri:</strong> {selectedItem.nomor_ser}</p>
              <p><strong>Lokasi:</strong> {selectedItem.lokasi}</p>
              <p><strong>Titik Lokasi:</strong> {selectedItem.titik_lokasi}</p>
              <p><strong>Spesifikasi:</strong> {selectedItem.spesifikasi}</p>
              <p><strong>Tanggal Pembelian:</strong> {selectedItem.tanggal_pembelian}</p>
              <p><strong>Pemasok:</strong> {selectedItem.pemasok}</p>
              <p><strong>PIC:</strong> {selectedItem.PIC}</p>
              <p><strong>Status:</strong> {selectedItem.status_pemasangan ? "Terpasang" : "Belum"}</p>
              <p><strong>Deskripsi:</strong> {selectedItem.deskripsi}</p>
              <Link
                href={{ pathname: "/InspectionDetails", query: { id: selectedItem.id_item } }}
                className="inline-block mt-4 text-blue-600 underline"
              >
                Lihat Detail Inspeksi
              </Link>
            </div>
          </div>
        )}
  
        {/* QR Modal */}
        {qrOpen && selectedItem && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white w-[50vw] p-6 rounded-lg relative flex flex-col items-center">
              <button
                onClick={() => setQrOpen(false)}
                className="absolute top-3 right-3 text-2xl"
              >
                <IoIosClose />
              </button>
              <h2 className="text-xl font-bold mb-4">{selectedItem.nama_item}</h2>
              <Canvas
                text={`${window.location.origin}/ItemsForm?id=${selectedItem.id_item}`}
                options={{
                  errorCorrectionLevel: "M",
                  margin: 3,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: "#000",
                    light: "#fff",
                  },
                }}
              />
              <Link
                href={{ pathname: "/ItemsForm", query: { id: selectedItem.id_item } }}
                className="mt-2 text-blue-600 underline"
              >
                Form Inspeksi untuk Item #{selectedItem.id_item}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackerPage;

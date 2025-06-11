"use client";

import React, { useState, useEffect, useRef } from "react";
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
import * as XLSX from "xlsx";

const ITEMS_PER_PAGE = 5;

interface Item {
  id_item: number;
  nama_item: string;
  jenis_sarana: string;
  lokasi: string;
  gambar: string;
  deskripsi: string;
  nomor_ser: string | number;
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

const TrackerPage = ({ session }: Props) => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isImageOpen, setIsImageOpen] = useState(false);

  const { Canvas } = useQRCode();
  const qrCanvasRef = useRef<HTMLDivElement>(null);

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items");
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

    fetchItems();
  }, []);

  const exportToExcel = (data: any[], fileName = "data_item.xlsx") => {
    // const formattedData = data.map((item) => ({
    //   "Nama Item" : item.nama_item,
    //   "Nomor Seri" : item.nomor_ser,
    //   "Jenis Sarana" : item.jenis_sarana,
    //   "Lokasi" : item.nama_lokasi,
    //   "Status" : item.status
    // }))

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Inspeksi");

    XLSX.writeFile(workbook, fileName);
  };

  const filteredItems = items.filter(
    (item) =>
      item.nama_item?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nama_lokasi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titik_lokasi?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jenis_sarana?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.PIC?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pemasok?.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleEdit = (item: Item) => {
    setEditItem(item);
    setIsEditOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Apakah Anda Yakin ingin Menghapus Item?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        //Refresh data setelah hapus
        setItems((prevItems) =>
          prevItems.filter((item) => item.id_item !== id)
        );
        alert("Item Berhasil Dihapus!");
      } else {
        console.error("Gagal Menghapus : ", result.error);
        alert("Gagal Menghapus Item.");
      }
    } catch (error) {
      console.error("Error Deleting Item : ", error);
      alert("Terjadi Kesalahan saat Menghapus");
    }
  };

  const handleSortByDate = () => {
    const sortedItems = [...items].sort((a, b) => {
      const dateA = new Date(a.tanggal_pembelian).getTime();
      const dateB = new Date(b.tanggal_pembelian).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setItems(sortedItems);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const downloadQRCode = () => {
    if (!qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-item-${selectedItem?.id_item}.png`;
    link.click();
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

  const toggleModal = () => {
    setIsImageOpen(!isImageOpen);
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
          <h1 className="md:text-[2vw] text-[4vw] font-bold">
            Data Items (Inspection Element)
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-start">
            <button
              onClick={handleSortByDate}
              className="bg-gray-200 text-black px-2 md:px-4 py-2 rounded-full md:text-sm hover:bg-gray-300 w-full sm:w-auto"
            >
              Sort by Tanggal Pembelian ({sortOrder === "asc" ? "⬆️" : "⬇️"})
            </button>
            <Link
              href="/NewElement"
              className="bg-[#37BBCB] text-white px-4 py-2 rounded-full flex items-center text-sm justify-center w-full sm:w-auto"
            >
              <RiUploadLine className="mr-2" />
              Tambah Item
            </Link>
            <button
              onClick={() => exportToExcel(items)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full"
            >
              Export ke Excel
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
                    <td className="px-4 py-2 border">{item.nomor_ser}</td>
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
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id_item)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
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
              <button
                onClick={toggleModal}
                className="p-[0.5vw] bg-blue-600 rounded-[0.5vw] font-bold text-white mb-[0.9vw]"
              >
                View Image
              </button>

              {/* Modal to display the image */}
              {isImageOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                  <div className="bg-white p-4 rounded">
                    <button
                      onClick={toggleModal}
                      className="absolute top-4 right-4 text-white"
                    >
                      X
                    </button>
                    {selectedItem?.gambar && (
                      <Image
                        src={selectedItem.gambar}
                        alt="foto barang"
                        width={500}
                        height={500}
                        className="object-contain"
                      />
                    )}
                  </div>
                </div>
              )}
              <h2 className="text-xl font-bold mb-2">
                {selectedItem.nama_item}
              </h2>
              <p>
                <strong>Nomor Seri:</strong> {selectedItem.nomor_ser}
              </p>
              <p>
                <strong>Lokasi:</strong> {selectedItem.nama_lokasi}
              </p>
              <p>
                <strong>Titik Lokasi:</strong> {selectedItem.titik_lokasi}
              </p>
              <p>
                <strong>Spesifikasi:</strong> {selectedItem.spesifikasi}
              </p>
              <p>
                <strong>Tanggal Pembelian:</strong>
                {selectedItem.tanggal_pembelian}
              </p>
              <p>
                <strong>Pemasok:</strong> {selectedItem.pemasok}
              </p>
              <p>
                <strong>PIC:</strong> {selectedItem.PIC}
              </p>
              <p>
                <strong>Status:</strong>
                {selectedItem.status_pemasangan ? "Terpasang" : "Belum"}
              </p>
              <p>
                <strong>Deskripsi:</strong> {selectedItem.deskripsi}
              </p>
            </div>
          </div>
        )}

        {/* QR Modal */}
        {qrOpen && selectedItem && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30 px-4">
            <div className="bg-white w-full max-w-xl p-6 rounded-lg relative flex flex-col items-center">
              <button
                onClick={() => setQrOpen(false)}
                className="absolute top-3 right-3 text-2xl"
              >
                <IoIosClose />
              </button>

              <button
                onClick={downloadQRCode}
                className="mb-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-300 text-white rounded-md hover:bg-blue-700 font-bold text-sm sm:text-base"
              >
                Generate QR Code
              </button>

              <div
                ref={qrCanvasRef}
                className="bg-white shadow rounded flex flex-col sm:flex-row items-center sm:items-start p-4 border border-blue-600 relative w-full"
              >
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
                <div className="sm:ml-4 mt-4 sm:mt-0 w-full text-center sm:text-left">
                  <Image
                    src="/images/LOGO INSPEKTRA PLUS 3.png"
                    alt="Logo Inspektra"
                    width={100}
                    height={100}
                    className="w-24 h-auto mb-2 mx-auto sm:mx-0"
                  />
                  <h2 className="text-lg sm:text-xl font-bold">
                    Name: {selectedItem.nama_item}
                  </h2>
                  <h2 className="text-lg sm:text-xl font-bold">
                    SN: {selectedItem.nomor_ser}
                  </h2>
                  <h2 className="text-xs sm:text-sm mt-2 text-red-700 font-bold">
                    SCAN FOR INSPECTION <br />
                    AND MORE DETAIL
                  </h2>
                </div>
              </div>
              <div className="w-full flex items-center justify-evenly">
                <Link
                  href={{
                    pathname: "/InspectionDetails",
                    query: { id: selectedItem.id_item },
                  }}
                  className="mt-4 bg-blue-600 text-white font-bold text-sm sm:text-base text-center p-[1vw] rounded-[1vw]"
                >
                  Inspection Details
                </Link>
                <Link
                  href={{
                    pathname: "/ItemsForm",
                    query: { id: selectedItem.id_item },
                  }}
                  className="mt-4 bg-blue-600 text-white font-bold text-sm sm:text-base text-center p-[1vw] rounded-[1vw]"
                >
                  Form Inspeksi
                </Link>
              </div>
            </div>
          </div>
        )}

        {isEditOpen && editItem && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white w-[50vw] max-h-[80vh] p-6 rounded-lg relative overflow-y-auto">
              <button
                onClick={() => setIsEditOpen(false)}
                className="absolute top-3 right-3 text-2x1"
              >
                <IoIosClose />
              </button>
              <h2 className="text-x1 font-bold mb-4">Edit Item</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!editItem) return;

                  const { id_item, nama_lokasi, ...updateData } = editItem;

                  const response = await fetch(`/api/items/${id_item}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateData),
                  });

                  if (response.ok) {
                    alert("Item Berhasil Diperbarui!");
                    setIsEditOpen(false);
                    //Reload Data
                    const updated = await response.json();
                    setItems((prev) =>
                      prev.map((item) =>
                        item.id_item === id_item ? updated.data : item
                      )
                    );
                  } else {
                    const result = await response.json();
                    alert("Gagal Update : " + result.error);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block font-semibold">Nama Item</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={editItem.nama_item}
                    onChange={(e) =>
                      setEditItem({ ...editItem, nama_item: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-semibold">Jenis Sarana</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={editItem.jenis_sarana}
                    onChange={(e) =>
                      setEditItem({ ...editItem, jenis_sarana: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-semibold">Nomor Seri</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={editItem.nomor_ser}
                    onChange={(e) =>
                      setEditItem({ ...editItem, nomor_ser: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-semibold">Deskripsi Item</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={editItem.deskripsi}
                    onChange={(e) =>
                      setEditItem({ ...editItem, deskripsi: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-semibold">Lokasi</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={editItem.nama_lokasi}
                    onChange={(e) =>
                      setEditItem({ ...editItem, nama_lokasi: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-semibold">Titik Lokasi</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={editItem.titik_lokasi}
                    onChange={(e) =>
                      setEditItem({ ...editItem, titik_lokasi: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-semibold">Spesifikasi</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={editItem.spesifikasi}
                    onChange={(e) =>
                      setEditItem({ ...editItem, spesifikasi: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-semibold">Tanggal</label>
                  <input
                    type="date"
                    className="w-full border p-2 rounded"
                    value={editItem.tanggal_pembelian?.split("T")[0] || ""}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        tanggal_pembelian: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block font-semibold">Pemasok</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={editItem.pemasok}
                    onChange={(e) =>
                      setEditItem({ ...editItem, pemasok: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-semibold">PIC</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={editItem.PIC}
                    onChange={(e) =>
                      setEditItem({ ...editItem, PIC: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block font-semibold">
                    Status Pemasangan
                  </label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={editItem.status_pemasangan}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        status_pemasangan: e.target.checked,
                      })
                    }
                  />
                  <span>
                    {editItem.status_pemasangan
                      ? "Terpasang"
                      : "Belum Terpasang"}
                  </span>
                </div>
                {/* <div>
                  <label className="block font-semibold">
                    Unggah Dokumentasi
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={editItem.spesifikasi}
                    onChange={(e) =>
                      setEditItem({ ...editItem, spesifikasi: e.target.value })
                    }
                  />
                </div> */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackerPage;

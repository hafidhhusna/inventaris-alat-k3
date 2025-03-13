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
import { useQRCode } from "next-qrcode";

const ITEMS_PER_PAGE = 8;

interface Item {
  id_item: number;
  nama_item: string;
  lokasi: string;
  gambar: string;
  deskripsi: string;
  nomor_ser: string;
}

const source = [
  { inspect_loc: "Data 1", inspect_date: "Data 1", inspect_status: "Data 1" },
  { inspect_loc: "Data 1", inspect_date: "Data 1", inspect_status: "Data 1" },
  { inspect_loc: "Data 1", inspect_date: "Data 1", inspect_status: "Data 1" },
  { inspect_loc: "Data 1", inspect_date: "Data 1", inspect_status: "Data 1" },
];

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
    <div className="w-screen h-screen flex flex-col relative bg-[#fff] text-[#000]">
      <div className="absolute">
        <NavBar />
      </div>
      <Header />

      <div className="w-full px-[15vw] pt-[2vw] grid grid-rows-2 grid-cols-4 gap-y-[2vw]">
        {loading ? (
          <p className="text-center col-span-4">Loading...</p>
        ) : paginatedItems.length > 0 ? (
          paginatedItems.map((item) => (
            <React.Fragment key={item.id_item}>
              <button
                onClick={() => {
                  console.log(item);
                  setIsOpen(true);
                  setSelectedItem(item);
                  console.log(selectedItem);
                }}
                className="w-[11.797vw] h-[16vw] rounded-[1.5vw] bg-white shadow-md flex flex-col items-center justify-center relative p-4 hover:bg-gray-100"
              >
                <Image
                  src={item.gambar || "/placeholder.jpg"}
                  alt={item.nama_item}
                  width={10000}
                  height={100000}
                  className="w-full h-[10vw] object-cover rounded-[1vw] mb-2"
                />
                <h1 className="text-[0.819vw] font-bold">{item.nama_item}</h1>
                <p className="text-[0.7vw] text-gray-500">{item.lokasi}</p>
              </button>

              {isOpen && selectedItem && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 z-10">
                  <div className="w-[75vw] h-[44.271vw] bg-white p-[4vw] relative">
                    <button
                      className="text-[1vw] absolute right-[0.5vw] top-[0.5vw]"
                      onClick={() => setIsOpen(false)}
                    >
                      <IoIosClose className="text-[4vw]"></IoIosClose>
                    </button>
                    <div className="flex justify-between">
                      <div className="flex flex-col pr-[4vw]">
                        <div className="flex items-center justify-between">
                          <h1 className="text-[2.448vw] font-bold">
                            {/* {formatColumnName(selectedItem.nama_item)} */}
                            {selectedItem.nama_item}
                          </h1>
                          <button
                            className="text-[2vw]"
                            onClick={() => setQrOpen(true)}
                          >
                            <Image
                              src="/images/qr.png"
                              alt="qr code"
                              width={10000}
                              height={10000}
                              className="w-[5.365vw] h-[5.417vw]"
                            />
                          </button>
                        </div>
                        <h1 className="w-[36vw] h-[7.969vw] text-[1vw] text-justify mt-[1vw]">
                          {selectedItem.deskripsi}
                        </h1>
                      </div>
                      <Image
                        src={selectedItem.gambar || "/placeholder.jpg"}
                        alt={selectedItem.nama_item}
                        width={10000}
                        height={10000}
                        className="w-[25vw] h-[17vw]"
                      />
                    </div>
                    <Link
                      href={{
                        pathname: "/InspectionDetails",
                        query: { id: selectedItem.id_item },
                      }}
                      className="absolute right-[4vw] text-blue-600"
                    >
                      recap
                    </Link>
                    <table className="mt-[5vw] w-full">
                      <thead className="border-b border-black font-bold text-[0.938vw] italic">
                        <tr>
                          <th>Inspection Location</th>
                          <th>Date of Location</th>
                          <th>Inspection Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-[0.938vw] text-center">
                        {source.map((item, index) => (
                          <tr key={index} className="border-b border-black">
                            <td>{item.inspect_loc}</td>
                            <td>{item.inspect_date}</td>
                            <td>{item.inspect_status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {qrOpen && selectedItem && (
                <div className="fixed inset-0 flex justify-center items-center z-20">
                  <div className="w-[75vw] h-[44.271vw] bg-white p-[3vw] relative flex items-center justify-evenly">
                    <button
                      className="text-[1vw] absolute right-[0.5vw] top-[0.5vw]"
                      onClick={() => setQrOpen(false)}
                    >
                      <IoIosClose className="text-[4vw]"></IoIosClose>
                    </button>
                    <div className="flex flex-col items-start justify-center">
                      <h1 className="text-[1.823vw] font-bold">
                        Nama <br />{" "}
                        <span className="text-[2.5vw] font-bold">
                          {selectedItem.nama_item}
                        </span>
                      </h1>
                      <h1 className="text-[1.823vw] font-bold mt-[1vw]">
                        Nomor SN <br />{" "}
                        <span className="text-[2.5vw] font-bold">
                          {selectedItem.nomor_ser}
                        </span>
                      </h1>
                    </div>
                    <div className="p-[0.2vw] border rounded-[0.3vw] shadow-md">
                      <Canvas
                        text={`${process.env.NEXT_PUBLIC_WEB_URI}/ItemsForm?id=${selectedItem.id_item}`}
                        options={{
                          errorCorrectionLevel: "M",
                          margin: 3,
                          scale: 4,
                          width: 400,
                          color: {
                            dark: "#000",
                            light: "#fff",
                          },
                        }}
                      />
                      <Link
                        href={{
                          pathname: "/ItemsForm",
                          query: { id: selectedItem.id_item },
                        }}
                        className="w-full flex items-center justify-center text-blue-600 underline"
                      >
                        form inspeksi item {selectedItem.id_item}
                      </Link>
                      <h1 className="w-full text-[1vw] flex items-center justify-center">
                        {/* Nomor Seri: {selectedItem.nomor_ser} */}
                      </h1>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <p className="text-center col-span-4">Tidak ada item tersedia.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-[2vw] flex justify-center">
          <Pagination>
            <PaginationContent>
              {/* Previous Button */}
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

              {/* First Page & Left Ellipsis */}
              {currentPage > 2 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(1);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {currentPage > 3 && <PaginationEllipsis />}
                </>
              )}

              {/* Dynamic Page Numbers */}
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

              {/* Right Ellipsis & Last Page */}
              {currentPage < totalPages - 1 && (
                <>
                  {currentPage < totalPages - 2 && <PaginationEllipsis />}
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(totalPages);
                      }}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              {/* Next Button */}
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
    </div>
  );
};

export default TrackerPage;

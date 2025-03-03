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

const ITEMS_PER_PAGE = 8;

interface Item {
  id_item: number;
  nama_item: string;
  lokasi: string;
  gambar: string;
}

const TrackerPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
            <Link
              href={{ pathname: "/ItemsForm", query: { id: item.id_item } }}
              key={item.id_item}
              className="w-[11.797vw] h-[16vw] rounded-[1.5vw] bg-white shadow-md flex flex-col items-center justify-center relative p-4"
            >
              <img
                src={item.gambar || "/placeholder.jpg"}
                alt={item.nama_item}
                className="w-full h-[10vw] object-cover rounded-[1vw] mb-2"
              />
              <h1 className="text-[0.819vw] font-bold">{item.nama_item}</h1>
              <p className="text-[0.7vw] text-gray-500">{item.lokasi}</p>
            </Link>
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

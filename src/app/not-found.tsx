// app/not-found.tsx

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Maaf, halaman yang kamu cari mungkin telah dihapus, diganti, atau tidak tersedia saat ini.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-5 py-2 text-white bg-[#FE8021] rounded-full hover:bg-orange-700 transition"
      >
        <FaArrowLeft className="mr-2" />
        Kembali ke Beranda
      </Link>
    </div>
  );
}

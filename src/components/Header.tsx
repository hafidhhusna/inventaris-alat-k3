"use client";

import React from "react";
import { BiSolidBellRing } from "react-icons/bi";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="w-full bg-[#FFFFFF] text-[#000] flex flex-col md:flex-row items-center justify-between px-[4vw] py-3 md:h-[6.198vw] md:px-[9vw] md:py-0 shadow-sm">
      {/* Search and Profile Placeholder */}
      <div className="flex w-full md:w-auto items-center md:justify-start mb-3 md:mb-0 relative">
        <form className="relative w-full md:ml-0 ml-[11vw]">
          <input
            type="text"
            placeholder="Cari Item..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 pr-10 w-full md:w-[20vw] text-sm"
          />
          <FaMagnifyingGlass className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </form>
      </div>

      {/* Bell and Contact Button */}
      <div className="flex w-full md:w-auto items-center justify-between md:justify-center gap-4">
        <button className="w-[10vw] h-[10vw] md:w-[2.656vw] md:h-[2.656vw] bg-[#51B5DD] rounded-full text-white flex items-center justify-center text-[5vw] md:text-[1.236vw]">
          <BiSolidBellRing />
        </button>
        <a
          href="https://wa.me/6281286968606"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-[13.802vw] h-[10vw] md:h-[2.656vw] bg-[#51B5DD] rounded-full font-bold text-white text-center flex items-center justify-center text-[4vw] md:text-[1.2vw]"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default Header;

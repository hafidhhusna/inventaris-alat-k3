"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";

const sources = [
  {
    id: "profile",
    src_img: <IoPersonSharp className="fill-current" />,
    text: "Profile",
    classnames: "text-[1.111vw]",
    linkto: "/Profile",
  },
  {
    id: "tracker",
    src_img: <FaArrowTrendUp className="fill-current" />,
    text: "Tracker",
    classnames: "text-[1.432vw]",
    linkto: "/Tracker",
  },
  {
    id: "settings",
    src_img: <IoMdSettings className="fill-current" />,
    text: "Settings",
    classnames: "text-[1.719vw]",
    linkto: "/SettingsPage",
  },
];

const NavBar: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-[8.021vw] h-screen bg-[#F9FAFC] rounded-r-[0.781vw] flex flex-col items-center justify-evenly text-[#000000]">
      <Image
        src="/images/LOGO INSPEKTRA PLUS 4.png"
        alt="logo"
        width={10000}
        height={10000}
        className="w-[4.948vw] h-[7.24vw]"
      />
      {sources.map((item) => (
        <div key={item.id} className="flex flex-col relative group">
          <Link
            href={item.linkto}
            className="flex flex-col items-center justify-center"
            onClick={() => setActive(item.id)}
          >
            <div className="p-[1vw] relative">
              <div
                className={`absolute w-[3vw] h-[3vw] bg-[#FE8021] rounded-full ${
                  active === item.id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                } z-0 
                top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 flex items-center justify-center`}
              >
                <div className={`${item.classnames} text-white z-10`}>
                  {item.src_img}
                </div>
              </div>
              <div
                className={`${item.classnames} ${
                  active === item.id
                    ? "text-white"
                    : "text-[#FE8021] group-hover:text-white"
                } z-10 transition-all duration-200 ease-in-out`}
              >
                {item.src_img}
              </div>
            </div>
            <h1 className="text-[1vw]">{item.text}</h1>
          </Link>
        </div>
      ))}

      <button className="flex flex-col items-center justify-center relative group">
        <div className="p-[1vw] relative">
          <div
            className="absolute w-[3vw] h-[3vw] bg-[#FE8021] rounded-full opacity-0 group-hover:opacity-100 z-0 
                          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 flex items-center justify-center"
          >
            <div className="text-[1.658vw] text-white z-10">
              <RiLogoutBoxLine className="fill-current" />
            </div>
          </div>

          <div className="text-[1.658vw] text-[#FE8021] group-hover:text-white z-10 transition-all duration-200 ease-in-out">
            <RiLogoutBoxLine className="fill-current" />
          </div>
        </div>
        <h1 className="text-[1vw]">Log Out</h1>
      </button>
    </div>
  );
};

export default NavBar;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { FaArrowTrendUp, FaFireExtinguisher } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";

type NavBarProps = {
  session : {
    user : {
      name : string;
      email : string;
      role : string;
    }
  }
}

const NavBar: React.FC<NavBarProps> = ({session}) => {
  const sources = [
    {
      id: "profile",
      src_img: <IoPersonSharp className="fill-current" />,
      text: "Profile",
      classnames: "text-[4.5vw] md:text-[1.111vw]",
      linkto: "/Profile",
    },
    {
      id: "items",
      src_img: <FaFireExtinguisher className="fill-current" />,
      text: "Items",
      classnames: "text-[4.5vw] md:text-[1.432vw]",
      linkto: "/Tracker",
    },
    {
      id: "upload",
      src_img: <FiUpload className="fill-current" />,
      text: "Upload",
      classnames: "text-[4.5vw] md:text-[1.432vw]",
      linkto: "/NewElement",
    },
    {
      id: "overview",
      src_img: <FaArrowTrendUp className="fill-current" />,
      text: "Overview",
      classnames: "text-[4.5vw] md:text-[1.719vw]",
      linkto: "/Readiness",
    },
    ...(session?.user?.role === "ADMIN"
      ? [
        {
          id: "adminApproval",
          src_img: <RiAdminFill className="fill-current" />,
          text: "Approval",
          classnames: "text-[4.5vw] md:text-[1.719vw]",
          linkto: "/AdminApproval",
        },
      ] : []),
    {
      id: "settings",
      src_img: <IoMdSettings className="fill-current" />,
      text: "Settings",
      classnames: "text-[4.5vw] md:text-[1.719vw]",
      linkto: "/SettingsPage",
    },
  ];
  const [active, setActive] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/login");
  };

  return (
    <>
      {/* Hamburger Button (Mobile Only) */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#FE8021] text-4xl"
        >
          <HiMenuAlt3 />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-40 bg-[#F9FAFC] rounded-r-2xl text-black flex flex-col justify-between py-6 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:w-[8.021vw] md:rounded-r-[0.781vw]`}
      >
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/images/LOGO INSPEKTRA PLUS 4.png"
            alt="logo"
            width={10000}
            height={10000}
            className="w-[7vw] h-[9.5vw] md:w-[4.948vw] md:h-[7.24vw]"
          />
        </div>

        {/* Menu Items */}
        <div className="flex-1 w-full overflow-y-auto px-2 flex flex-col items-center gap-4 md:gap-0 md:justify-evenly">
          {sources.map((item) => (
            <div key={item.id} className="flex flex-col relative group">
              <Link
                href={item.linkto}
                className="flex flex-col items-center justify-center"
                onClick={() => {
                  setActive(item.id);
                  setIsOpen(false); // close on mobile click
                }}
              >
                <div className="p-4 md:p-[1vw] relative">
                  <div
                    className={`absolute w-12 h-12 md:w-[3vw] md:h-[3vw] bg-[#FE8021] rounded-full ${
                      active === item.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    } z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 flex items-center justify-center`}
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
                <h1 className="text-[3.5vw] md:text-[1vw] font-bold">
                  {item.text}
                </h1>
              </Link>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          className="flex flex-col items-center justify-center relative group mb-4"
          onClick={handleLogout}
        >
          <div className="p-4 md:p-[1vw] relative">
            <div className="absolute w-12 h-12 md:w-[3vw] md:h-[3vw] bg-[#FE8021] rounded-full opacity-0 group-hover:opacity-100 z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-[5vw] md:text-[1.658vw] text-white z-10">
                <RiLogoutBoxLine className="fill-current" />
              </div>
            </div>
            <div className="text-[5vw] md:text-[1.658vw] text-[#FE8021] group-hover:text-white z-10 transition-all duration-200 ease-in-out">
              <RiLogoutBoxLine className="fill-current" />
            </div>
          </div>
          <h1 className="text-[3.2vw] md:text-[1vw] font-bold">Log Out</h1>
        </button>
      </div>

      {/* Optional overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default NavBar;

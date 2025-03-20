import React from "react";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import { BsFillBox2Fill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegDotCircle } from "react-icons/fa";
import Link from "next/link";

const source = [
  { icon: <BsFillBox2Fill />, text: "Item Baru", linkto: "/upload" },
  { icon: <IoLocationOutline />, text: "Lokasi Baru", linkto: "/input-lokasi" },
  {
    icon: <FaRegDotCircle />,
    text: "Titik Lokasi Baru",
    linkto: "/input-titik-lokasi",
  },
];

const NewElement = () => {
  return (
    <div className="w-screen h-screen flex flex-col relative bg-[#fff] text-[#000]">
      <div className="absolute">
        <NavBar />
      </div>
      <Header />
      <div className="w-full px-[12vw] py-[2vw]">
        <h1 className="text-[3.021vw]">
          <span className="font-bold">Tambah</span> Element Baru
        </h1>
        <div className="flex mt-[1vw]">
          {source.map((item, index) => (
            <div key={index} className="mr-[3vw] flex flex-col items-center">
              <Link
                href={item.linkto}
                className="w-[16.146vw] h-[16.146vw] rounded-[0.1vw] bg-[#37BBCB] flex items-center justify-center text-white text-[7vw]"
              >
                {item.icon}
              </Link>
              <h1 className="text-[1.563vw] mt-[0.5vw]">{item.text}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewElement;

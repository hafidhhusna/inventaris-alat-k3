import React from "react";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import { BsFillBox2Fill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegDotCircle } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import Link from "next/link";

type Props = {
  session: any;
};

const source = [
  {
    icon: <BsFillBox2Fill />,
    text: "Item Baru",
    linkto: "/upload",
    color: "bg-[#37BBCB]",
  },
  {
    icon: <IoLocationOutline />,
    text: "Lokasi Baru",
    linkto: "/input-lokasi",
    color: "bg-[#37BBCB]",
  },
  {
    icon: <FaRegDotCircle />,
    text: "Titik Lokasi Baru",
    linkto: "/input-titik-lokasi",
    color: "bg-[#37BBCB]",
  },
  {
    icon: <IoTrashBin />,
    text: "Hapus Lokasi",
    linkto: "/delete-lokasi",
    color: "bg-red-600",
  },
  {
    icon: <IoTrashBin />,
    text: "Hapus Titik Lokasi",
    linkto: "/delete-titik-lokasi",
    color: "bg-red-600",
  },
];

const NewElement = ({ session }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col relative bg-[#fff] text-[#000]">
      <div className="absolute">
        <NavBar session={session} />
      </div>
      <Header />
      <div className="w-full px-[5%] py-[2vw] max-md:px-4 max-md:py-4">
        <h1 className="text-[3.021vw] text-center max-md:text-[5vw]">
          <span className="font-bold">Pengaturan</span> Element
        </h1>
        <div className="flex flex-wrap justify-center mt-[1vw] max-md:mt-4">
          {source.map((item, index) => (
            <div
              key={index}
              className="mr-[3vw] flex flex-col items-center max-md:mr-[5vw] mb-4 max-md:mb-6"
            >
              <Link
                href={item.linkto}
                className={`w-[10vw] h-[10vw] rounded-[0.1vw] ${item.color} flex items-center justify-center text-white text-[7vw] max-md:w-[40vw] max-md:h-[40vw] max-md:text-[10vw]`}
              >
                {item.icon}
              </Link>
              <h1 className="text-[1vw] mt-[0.5vw] text-center max-md:text-[4vw]">
                {item.text}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewElement;

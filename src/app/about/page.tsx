import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { CiMail } from "react-icons/ci";

const sources = [
  {
    src_img: <FaLocationDot />,
    text1: "Address",
    text2: "Lorem ipsum dolor sit amet, consectetur",
    img_classname: "text-[1.146vw] text-white",
  },
  {
    src_img: <IoCall />,
    text1: "Phone Number",
    text2: "+6289810001293",
    img_classname: "text-[1.146vw] text-white",
  },
  {
    src_img: <CiMail />,
    text1: "Email",
    text2: "hafidhanjink@mail.ptcintasejati.co.id",
    img_classname: "text-[1.25vw] text-white",
  },
];

const ContactUsPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-start justify-center p-[6vw] bg-[#fff] text-[#000] relative overflow-hidden">
      <Link href="/Profile" className="absolute top-[1vw] left-[2vw]">
        <div className="rounded-full w-[3.646vw] h-[3.646vw] bg-[#F1F2F3] text-[1.615vw] text-[#FA8020] flex items-center justify-center">
          <FaArrowLeft />
        </div>
      </Link>
      <Image
        src="/images/LOGO INSPEKTRA PLUS 3.png"
        alt="logo"
        width={10000}
        height={10000}
        className="w-[9.427vw] h-[3.281vw] absolute right-[2vw] top-[1vw]"
      />
      <div>
        <h1 className="text-[2.5vw]">Who Are We?</h1>
        <p className="text-[1.146vw]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          <br />
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          <br />
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          <br />
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div>
        <h1 className="text-[2.5vw] mt-[1.7vw]">Get In Touch</h1>
        <p className="text-[1.146vw]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          <br />
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
        </p>
      </div>
      <div className="mt-[1.5vw]">
        {sources.map((item, index) => (
          <div key={index} className="flex">
            <div className="w-[2.865vw] h-[2.865vw] rounded-full bg-[#FCAE18] mb-[0.8vw] flex items-center justify-center">
              <div className={item.img_classname}>{item.src_img}</div>
            </div>
            <div className="ml-[1vw]">
              <h1 className="font-bold text-[0.938vw]">{item.text1}</h1>
              <h1 className="text-[0.938vw]">{item.text2}</h1>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[30vw] h-[0.12vw] bg-[#D3D3D3] mt-[1vw]"></div>
    </div>
  );
};

export default ContactUsPage;

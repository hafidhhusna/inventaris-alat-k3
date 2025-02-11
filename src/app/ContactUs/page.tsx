import React from "react";
import Image from "next/image";
import Link from "next/link";

const sources = [
  {
    src_img: "/",
    text1: "Address",
    text2: "Lorem ipsum dolor sit amet, consectetur",
    img_classname: "",
  },
  {
    src_img: "/",
    text1: "Phone Number",
    text2: "+6289810001293",
    img_classname: "",
  },
  {
    src_img: "/",
    text1: "Email",
    text2: "hafidhanjink@mail.ptcintasejati.co.id",
    img_classname: "",
  },
];

const ContactUsPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-start justify-center p-[6vw] bg-[#fff] text-[#000] relative overflow-hidden">
      <Link href="/Tracker" className="absolute top-[1vw] left-[2vw]">
        <div className="rounded-full w-[3.646vw] h-[3.646vw] bg-[#F1F2F3]"></div>
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
            <div className="w-[2.865vw] h-[2.865vw] rounded-full bg-[#FCAE18] mb-[0.8vw]">
              <Image
                src={item.src_img}
                alt="logo"
                width={10000}
                height={10000}
                className={item.img_classname}
              />
            </div>
            <div className="ml-[1vw]">
              <h1 className="font-bold text-[0.938vw]">{item.text1}</h1>
              <h1 className="text-[0.938vw]">{item.text2}</h1>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[30vw] h-[0.12vw] bg-[#D3D3D3] mt-[1vw]"></div>
      <h1 className="text-[1.146vw] mt-[1vw]">Reach Us Through Social Media</h1>
      <div className=" w-[30vw] flex items-start justify-between mt-[1vw]">
        <Link href="/">social media 1</Link>
        <Link href="/">social media 2</Link>
        <Link href="/">social media 3</Link>
      </div>
    </div>
  );
};

export default ContactUsPage;

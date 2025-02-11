import React from "react";
import Image from "next/image";
import Link from "next/link";

const sources = [
  {
    src_img: "/images/profile.png",
    text: "Profile",
    classnames: "w-[1.111vw] h-[1.111vw]",
    linkto: "/Profile",
  },
  {
    src_img: "/images/tracker.png",
    text: "Tracker",
    classnames: "w-[1.432vw] h-[0.677vw]",
    linkto: "/Tracker",
  },
  {
    src_img: "/images/profile.png",
    text: "Settings",
    classnames: "w-[1.111vw] h-[1.111vw]",
    linkto: "/Settings",
  },
];

const NavBar = () => {
  return (
    <div className="w-[8.021vw] h-screen bg-[#F9FAFC] rounded-r-[0.781vw] flex flex-col items-center justify-evenly text-[#000000] ">
      <Image
        src="/images/LOGO INSPEKTRA PLUS 4.png"
        alt="logo"
        width={10000}
        height={10000}
        className="w-[4.948vw] h-[7.24vw]"
      />
      {sources.map((item, index) => (
        <div key={index} className="flex flex-col relative">
          <Link
            href={item.linkto}
            className="0.625vw flex flex-col items-center justify-center"
          >
            <div
              className=" p-[1vw] hover:before:content-[''] hover:before:absolute hover:before:w-[3vw] hover:before:h-[3vw] 
                    hover:before:bg-orange-500 hover:before:rounded-full hover:before:opacity-50 hover:before:z-10 hover:before:top-0
                    hover:before:left-1/2 hover:before:-translate-x-1/2"
            >
              <Image
                src={item.src_img}
                alt="logo"
                width={10000}
                height={10000}
                className={item.classnames}
              />
            </div>
            <h1 className="text-[1vw]">{item.text}</h1>
          </Link>
        </div>
      ))}

      <div className="flex flex-col items-center justify-center relative">
        <div
          className="p-[1vw] hover:before:content-[''] hover:before:absolute hover:before:w-[3vw] hover:before:h-[3vw] 
                    hover:before:bg-orange-500 hover:before:rounded-full hover:before:opacity-50 hover:before:z-10 hover:before:top-0
                    hover:before:left-1/2 hover:before:-translate-x-1/2"
        >
          <Image
            src="/images/profile.png"
            alt="logo"
            width={10000}
            height={10000}
            className="w-[1.111vw] h-[1.111vw]"
          />
        </div>
        <h1>Log Out</h1>
      </div>
    </div>
  );
};

export default NavBar;

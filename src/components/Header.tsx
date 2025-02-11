import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full h-[6.198vw] bg-[#FFFFFF] text-[#000] flex items-center justify-evenly">
      <div className="flex">
      </div>
      <div className="flex items-center justify-center">
        <button className="rounded-full w-[2.656vw] h-[2.656vw] bg-[#51B5DD] mr-[1vw]"></button>
        <Link
          href="/about"
          className="rounded-full w-[13.802vw] h-[2.656vw] bg-[#51B5DD] font-bold text-white flex items-center justify-center"
        >
          <h1 className="text-[1.2vw]">Contact Us</h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;

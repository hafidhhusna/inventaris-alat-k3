import React from "react";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";

const Recap = () => {
  return (
    <div className="w-screen h-screen flex flex-col relative bg-[#fff] text-[#000]">
      <div className="absolute">
        <NavBar></NavBar>
      </div>
      <Header></Header>
    </div>
  );
};

export default Recap;

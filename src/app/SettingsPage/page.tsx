import React from "react";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";

const SettingsPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col relative bg-[#fff] text-[#000]">
      <div className="absolute">
        <NavBar></NavBar>
      </div>
      <Header></Header>
      <div className="px-[15vw] pt-[2vw]">
        <h1 className="text-[1.563vw] mb-[0.8vw]">Delete Your Account</h1>
        <p className="text-[1.146vw] mb-[0.8vw]">
          When you delete your account, you lose access to the Inspektra
          <br />
          website, and we permanently delete your personal data
        </p>
        <form action="" className="flex mb-[1vw]">
          <input type="checkbox" />
          <label htmlFor="" className="0.99vw italic ml-[1.5vw]">
            Check the square for confirmation
          </label>
        </form>
        <button className="w-[11.771vw] h-[2.552vw] rounded-[2.292vw] bg-[#CB3739] text-white">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;

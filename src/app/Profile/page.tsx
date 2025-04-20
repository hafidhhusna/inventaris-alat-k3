"use client";

import React from "react";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";

const ProfilePage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col relative bg-white text-black">
      <div className="absolute">
        <NavBar />
      </div>
      <Header />
      <div className="px-6 md:px-[15vw] pt-6 md:pt-[2vw]">
        <h1 className="text-2xl md:text-[2.083vw]">Welcome, Ryan</h1>
        <div className="flex flex-col md:flex-row pt-6 md:pt-[2vw] gap-6">
          {/* Profile Picture & Button */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-24 h-24 md:w-[7.396vw] md:h-[7.396vw] rounded-full bg-black"></div>
            <button className="w-32 h-8 md:w-[5.104vw] md:h-[1.094vw] text-xs md:text-[0.469vw] flex items-center justify-center mt-2 md:mt-[0.3vw] rounded-md md:rounded-[0.26vw] bg-[#37BBCB] text-white">
              Change Picture
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col items-start justify-start w-full">
            <div className="flex flex-col mb-6 md:mb-[1.7vw] w-full">
              <label>Username</label>
              <input
                type="text"
                className="w-full md:w-[22.865vw] h-10 md:h-[2.135vw] bg-[#f4f4f4] rounded-md md:rounded-[0.417vw] px-3 md:px-[0.5vw]"
              />
            </div>
            <div className="flex flex-col mb-6 md:mb-[1.7vw] w-full">
              <label>Email Address</label>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full">
                <input
                  type="text"
                  className="w-full md:w-[22.865vw] h-10 md:h-[2.135vw] bg-[#f4f4f4] rounded-md md:rounded-[0.417vw] px-3 md:px-[0.5vw]"
                />
                <button className="text-[#0091B6] text-sm md:text-[0.885vw] italic">
                  Change Email
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-6 md:mb-[1.7vw] w-full">
              <label>Phone Number</label>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full">
                <input
                  type="text"
                  className="w-full md:w-[22.865vw] h-10 md:h-[2.135vw] bg-[#f4f4f4] rounded-md md:rounded-[0.417vw] px-3 md:px-[0.5vw]"
                />
                <button className="text-[#0091B6] text-sm md:text-[0.885vw] italic">
                  Link Phone Number
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-6 md:mb-[1.7vw] w-full">
              <label>Account Password</label>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 w-full">
                <input
                  type="text"
                  className="w-full md:w-[22.865vw] h-10 md:h-[2.135vw] bg-[#f4f4f4] rounded-md md:rounded-[0.417vw] px-3 md:px-[0.5vw]"
                />
                <button className="text-[#0091B6] text-sm md:text-[0.885vw] italic">
                  Change Password
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0 w-full md:w-[22.865vw]">
              <button className="w-full md:w-[10.521vw] h-12 md:h-[2.552vw] bg-[#37BBCB] rounded-full text-sm md:text-[0.885vw] text-white">
                Save Changes
              </button>
              <button className="w-full md:w-[10.521vw] h-12 md:h-[2.552vw] bg-[#CB3739] rounded-full text-sm md:text-[0.885vw] text-white">
                Discard Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

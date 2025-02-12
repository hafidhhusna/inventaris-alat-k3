import React from "react";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";

const ProfilePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col relative bg-[#fff] text-[#000]">
      <div className="absolute">
        <NavBar></NavBar>
      </div>
      <Header></Header>
      <div className="px-[15vw] pt-[2vw]">
        <h1 className="text-[2.083vw]">Welcome, Mr. Harry</h1>
        <div className="flex pt-[2vw]">
          <div className="flex flex-col items-center justify-start">
            <div className="w-[7.396vw] h-[7.396vw] rounded-full bg-[#000]"></div>
            <button className="w-[5.104vw] h-[1.094vw] text-[0.469vw] flex items-center justify-center mt-[0.3vw] rounded-[0.26vw] bg-[#37BBCB] text-white">
              Change Picture
            </button>
          </div>
          <form
            action=""
            className="flex flex-col items-start justify-start ml-[2vw]"
          >
            <div className="flex flex-col mb-[1.7vw]">
              <label htmlFor="">Username</label>
              <input
                type="text"
                className="w-[22.865vw] h-[2.135vw] bg-[#f4f4f4] rounded-[0.417vw] px-[0.5vw]"
              />
            </div>
            <div className="flex flex-col mb-[1.7vw]">
              <label htmlFor="">Email Address</label>
              <div className="flex w-[40vw] justify-between">
                <input
                  type="text"
                  className="w-[22.865vw] h-[2.135vw] bg-[#f4f4f4] rounded-[0.417vw] px-[0.5vw]"
                />
                <button className="text-[#0091B6] text-[0.885vw] italic">
                  Change Email
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-[1.7vw]">
              <label htmlFor="">Phone Number</label>
              <div className="flex w-[40vw] justify-between">
                <input
                  type="text"
                  className="w-[22.865vw] h-[2.135vw] bg-[#f4f4f4] rounded-[0.417vw] px-[0.5vw]"
                />
                <button className="text-[#0091B6] text-[0.885vw] italic">
                  Link Phone Number
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-[1.7vw]">
              <label htmlFor="">Account Password</label>
              <div className="flex w-[40vw] justify-between">
                <input
                  type="text"
                  className="w-[22.865vw] h-[2.135vw] bg-[#f4f4f4] rounded-[0.417vw] px-[0.5vw]"
                />
                <button className="text-[#0091B6] text-[0.885vw] italic">
                  Change Password
                </button>
              </div>
            </div>
            <div className="w-[22.865vw] flex items-start justify-between">
              <button className="w-[10.521vw] h-[2.552vw] bg-[#37BBCB] rounded-[2.292vw] text-[0.885vw] text-white">
                Save Changes
              </button>
              <button className="w-[10.521vw] h-[2.552vw] bg-[#CB3739] rounded-[2.292vw] text-[0.885vw] text-white">
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

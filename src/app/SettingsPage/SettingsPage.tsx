import React from "react";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";

type Props = {
  session: any;
}

const SettingsPage = ({session} : Props) => {
  return (
    <div className="w-screen min-h-screen flex flex-col relative bg-white text-black">
      <div className="absolute">
        <NavBar session={session} />
      </div>

      <Header />

      <div className="px-6 pt-6 sm:px-12 md:px-24 lg:px-[15vw]">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          Delete Your Account
        </h1>

        <p className="text-sm sm:text-base md:text-lg mb-4 leading-relaxed">
          When you delete your account, you lose access to the Inspektra
          website, and we permanently delete your personal data
        </p>

        <form className="flex items-start gap-3 mb-6">
          <input type="checkbox" className="mt-1" />
          <label className="text-sm italic">
            Check the square for confirmation
          </label>
        </form>

        <button className="w-full sm:w-[220px] h-12 rounded-full bg-[#CB3739] text-white text-sm sm:text-base hover:opacity-90 transition-all">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;

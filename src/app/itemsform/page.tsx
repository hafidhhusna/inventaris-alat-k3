"use client";

import React, { useState } from "react";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import { useSearchParams } from "next/navigation";

const ItemsForm = () => {
  const [selected, setSelected] = useState("Status Condition");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="w-screen h-screen bg-[#fcfcfc] flex flex-col items-center">
      <div className="w-full h-[5.156vw] p-[2vw] flex items-center justify-between bg-[#fff]">
        <Image
          src="/images/LOGO INSPEKTRA PLUS 3.png"
          width={10000}
          height={10000}
          alt="logo Inspektra"
          className="w-[9.427vw] h-[3.281vw]"
        />
        <button className="w-[13.802vw] h-[2.656vw] bg-[#51B5DD] rounded-[2.5vw] text-[1.042vw] text-white">
          Tutup Form
        </button>
      </div>
      <h1 className="p-[1vw] drop-shadow-md bg-[#fff] mt-[2vw] rounded-[0.521vw] text-[2.083vw]">
        Inspeksi Alat Pemadam Api Portabel (APAP)
      </h1>
      <h1 className="mt-[1vw] text-[1.302vw]">
        Formulir Inspeksi Alat Pemadam Api
      </h1>
      <div className="w-[48.125vw] h-[0.052vw] bg-black mt-[0.5vw]"></div>
      <div className="w-[48.125vw] flex justify-evenly py-[0.78vw] text-[1.302vw]">
        <h1>Elemen</h1>
        <h1>Status Inspeksi</h1>
      </div>
      <div className="w-[48.125vw] h-[0.052vw] bg-black"></div>
      <div className="flex w-[48.125vw] items-center justify-evenly my-[2vw]">
        <Dropdown
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
        />
        <h1 className="text-[1.302vw] mr-[3.5vw]">Lokasi</h1>
        <p>{id}</p>
      </div>
    </div>
  );
};

export default ItemsForm;

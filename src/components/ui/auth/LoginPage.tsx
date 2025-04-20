import * as React from "react";
import { LoginForm } from "./LoginForm";
import Image from "next/image";

export const LoginPage: React.FC = () => {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f3866c0d278702d83b5f2db2412d844344c8820e6cb6d661c43da552b512d65?placeholderIfAbsent=true&apiKey=4e53afb34c60481086f7eb3daaf57ab9"
        alt="Background"
        fill
        className="object-cover z-0"
      />

      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-white/80 rounded-3xl px-6 py-10 shadow-xl w-full max-w-[500px] mx-4 backdrop-blur-md">
        <Image
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/124b28eb1ee9f3a1454957e8e9b70e9f0cd39cd097a858fc7af006d6f8b9e7ae?placeholderIfAbsent=true&apiKey=4e53afb34c60481086f7eb3daaf57ab9"
          alt="Company logo"
          width={181}
          height={63}
          className="mb-6 self-end"
        />
        <h1 className="text-3xl md:text-4xl font-semibold text-center leading-tight mb-6">
          Welcome!
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

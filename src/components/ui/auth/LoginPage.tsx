import * as React from "react";
import { LoginForm } from "./LoginForm";
import Image from "next/image";

export const LoginPage: React.FC = () => {
  return (
    <div className="overflow-y-hidden w-screen h-screen pr-12 bg-white max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f3866c0d278702d83b5f2db2412d844344c8820e6cb6d661c43da552b512d65?placeholderIfAbsent=true&apiKey=4e53afb34c60481086f7eb3daaf57ab9"
            alt="Login page illustration"
            width={10000}
            height={10000}
            className="object-contain w-full aspect-[0.85] max-md:mt-10 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start mt-14 text-center text-black max-md:mt-10 max-md:max-w-full">
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/124b28eb1ee9f3a1454957e8e9b70e9f0cd39cd097a858fc7af006d6f8b9e7ae?placeholderIfAbsent=true&apiKey=4e53afb34c60481086f7eb3daaf57ab9"
              alt="Company logo"
              width={10000}
              height={10000}
              className="object-contain self-end max-w-full aspect-[2.87] w-[181px]"
            />
            <h1 className="mt-32 text-5xl font-semibold tracking-tighter leading-[59px] max-md:mt-10 max-md:text-4xl max-md:leading-[55px]">
              Please Log In to Your Account
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

import * as React from "react";
import { InputField } from "./InputField";
import { SocialButton } from "./SocialButton";

export const SignUpForm: React.FC = () => {
  const socialIcons = ["Google", "Facebook", "Twitter"];

  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <div className="flex overflow-auto relative flex-col flex-auto gap-10 px-10 py-12 w-[1251] min-h-[750] max-md:px-5 max-md:max-w-[1251]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc7f0b30231d68c2b97f41dedbb908c94e4a7b86c5aab3673b441b3bedece3e7?placeholderIfAbsent=true&apiKey=4e53afb34c60481086f7eb3daaf57ab9"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c75c0a1-b235-410d-a76c-4966b81748b1?placeholderIfAbsent=true&apiKey=4e53afb34c60481086f7eb3daaf57ab9"
          alt="Company Logo"
          className="object-left-bottom shrink-0 self-start rounded-full aspect-square bg-slate-50 h-[70px] w-[70px]"
        />
        <div className="flex relative flex-col grow- shrink-0 items-center pt-1 pr-3.5 pb-28 pl-20 rounded-3xl basis-0 bg-zinc-50 shadow-[1px_1px_80px_rgba(0,0,0,0.1)] w-full max-md:pb-24 max-md:pl-5 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/124b28eb1ee9f3a1454957e8e9b70e9f0cd39cd097a858fc7af006d6f8b9e7ae?placeholderIfAbsent=true&apiKey=4e53afb34c60481086f7eb3daaf57ab9"
            alt="Decorative header"
            className="object-contain self-end max-w-full aspect-[2.87] w-[181px]"
          />

          <form className="flex flex-col items-center w-full">
            <h1 className="mt-16 text-4xl font-semibold tracking-tight leading-none text-black max-md:mt-10">
              Create Your Account
            </h1>
            <p className="mt-5 text-2xl font-extralight tracking-tight leading-none text-black">
              Select your sign up method:
            </p>

            <InputField placeholder="Username" />
            <InputField placeholder="Email Address" type="email" />
            <InputField placeholder="Password" type="password" />

            <button
              type="submit"
              className="px-16 py-5 mt-2.5 max-w-full text-xl font-semibold tracking-tight leading-none text-center bg-teal-400 rounded-2xl text-zinc-50 w-[479px] max-md:px-5"
            >
              Sign Up
            </button>

            <p className="mt-12 text-2xl font-extralight tracking-tight leading-none text-black max-md:mt-10">
              Or Sign Up With:
            </p>

            <div className="flex gap-5 justify-between mt-4 max-w-full w-[229px]">
              {socialIcons.map((icon) => (
                <SocialButton key={icon} icon={icon} />
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

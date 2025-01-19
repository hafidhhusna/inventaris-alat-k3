import * as React from "react";
// import { Hero } from "../hero/Hero"; // Import Hero
import { InputField } from "./InputField";
import { LoginButton } from "./LoginButton";

export function LoginForm() {
  return (
    <form className="flex flex-col self-stretch my-auto text-lg font-extralight tracking-tight leading-none text-center text-black max-md:mt-10">
      <div className="px-0 mt-8">
        <InputField type="email" placeholder="Email address" id="email-input" />
        <InputField
          type="password"
          placeholder="Password"
          id="password-input"
        />
        <LoginButton>Login</LoginButton>
        <div className="self-center mt-7 text-sm font-light tracking-tight leading-none">
          Or Register
        </div>
      </div>
    </form>
  );
}

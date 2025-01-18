import * as React from "react";
// import { Hero } from "../hero/Hero"; // Import Hero
import { InputField } from "./InputField";
import { Button } from "./Button";

export function LoginForm() {
  return (
    <form className="flex flex-col self-stretch my-auto text-lg font-extralight tracking-tight leading-none text-center text-black max-md:mt-10">
      {/* Tambahkan komponen Hero */}
      {/* <Hero /> */}
      <div className="px-8 mt-8">
        <InputField type="email" placeholder="Email address" id="email-input" />
        <InputField
          type="password"
          placeholder="Password"
          id="password-input"
        />
        <Button>Login</Button>
        <div className="self-center mt-7 text-sm font-light tracking-tight leading-none">
          Or Register
        </div>
      </div>
    </form>
  );
}

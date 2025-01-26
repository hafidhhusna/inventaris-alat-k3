'use client';

import * as React from "react";
import { InputField } from "./InputField";
import { Button } from "./Button";

export const LoginForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-12 max-w-full text-lg w-[720px] max-md:mt-10 max-md:ml-1.5"
    >
      <InputField type="email" id="email" placeholder="Email address" />
      <InputField type="password" id="password" placeholder="Password" />
      <Button>Login</Button>
      <div className="flex gap-2.5 self-center mt-8 max-w-full text-sm font-light tracking-tight leading-none w-[234px]">
        <div className="grow">Or Register</div>
        <div
          className="object-contain shrink-0 w-px bg-black"
          role="separator"
          aria-hidden="true"
        />
        <div className="grow shrink w-[141px]">Forgot Your Password?</div>
      </div>
    </form>
  );
};

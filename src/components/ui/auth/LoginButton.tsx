import * as React from "react";
import { ButtonProps } from "./types";

export function LoginButton({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-16 py-4 mt-2 w-full text-lg font-semibold tracking-tight leading-none text-black whitespace-nowrap bg-yellow-400 rounded-2xl max-md:px-5 max-md:mx-2.5 hover:bg-yellow-500 active:bg-yellow-600"
    >
      {children}
    </button>
  );
}

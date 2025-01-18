import * as React from "react";
import { InputFieldProps } from "./types";

export function InputField({ placeholder, type, id }: InputFieldProps) {
  return (
    <div className="relative mt-2">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        type={type}
        id={id}
        className="px-9 py-4 w-full text-lg font-extralight tracking-tight leading-none text-black rounded-2xl border-2 border-solid border-zinc-300 max-md:px-5 max-md:mx-2.5"
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}

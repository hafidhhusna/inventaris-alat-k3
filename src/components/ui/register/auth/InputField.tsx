import * as React from "react";
import { InputFieldProps } from "./types";

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  type = "text",
}) => {
  return (
    <div className="relative w-full max-w-[479px] mb-2.5">
      <label htmlFor={`input-${placeholder}`} className="sr-only">
        {placeholder}
      </label>
      <input
        type={type}
        id={`input-${placeholder}`}
        className="px-16 py-5 w-full text-xl font-extralight tracking-tight leading-none text-center text-black rounded-2xl border-2 border-solid border-zinc-300 max-md:px-5"
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
};

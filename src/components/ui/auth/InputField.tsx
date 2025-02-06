import * as React from "react";
import { InputFieldProps } from "./types";

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  type,
  id,
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full px-8 py-4 mt-2 text-lg font-extralight tracking-tight leading-none rounded-2xl border-2 border-solid border-zinc-300"
        aria-label={placeholder}
        value = {value}
        onChange={onChange}
      />
    </div>
  );
};

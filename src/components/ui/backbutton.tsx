import * as React from "react";
import { ButtonProps } from "./auth/types";

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 mt-2 font-semibold text-white whitespace-nowrap 
        bg-teal-400 hover:bg-teal-600 active:bg-teal-700 
        rounded-2xl w-full transition duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-teal-300 
        ${className || ""}
      `}
    >
      {children}
    </button>
  );
};

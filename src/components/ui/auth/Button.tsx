import * as React from "react";
import { ButtonProps } from "./types";

export const Button: React.FC<ButtonProps & { type?: "button" | "submit"; isLoading?: boolean }> = ({
  children,
  onClick,
  className,
  type = "button",
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`px-8 py-4 mt-2 font-semibold text-white whitespace-nowrap 
        bg-teal-400 hover:bg-teal-600 active:bg-teal-700 
        rounded-2xl w-full transition duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-teal-300
        disabled:bg-gray-400 disabled:cursor-not-allowed
        ${className || ""}
      `}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

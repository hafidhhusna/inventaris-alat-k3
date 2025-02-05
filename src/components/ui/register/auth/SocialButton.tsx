import * as React from "react";
import { SocialButtonProps } from "./types";

export const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex shrink-0 bg-zinc-300 h-[57px] w-[57px]"
      aria-label={`Sign in with ${icon}`}
    />
  );
};

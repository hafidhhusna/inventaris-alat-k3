import * as React from "react";
import { NavItemProps } from "./types";

export const NavItem: React.FC<NavItemProps> = ({ icon, label, alt }) => {
  return (
    <>
      <img
        loading="lazy"
        src={icon}
        alt={alt}
        className="object-contain aspect-square w-[21px]"
      />
      <div className="mt-8">{label}</div>
    </>
  );
};

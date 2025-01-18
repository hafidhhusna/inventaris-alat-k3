import * as React from "react";
import { NavItem } from "./NavItem";

const navigationItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e127aac7df68ef9515abd30f6067399bff8d4421446afa48e48d7ffbbd90e133?apiKey=4e53afb34c60481086f7eb3daaf57ab9&",
    label: "Profile",
    alt: "Profile icon",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e607e3f814313e49382b05858e082fb5b2d7a757aff8dcd0417f9f107e113c9e?apiKey=4e53afb34c60481086f7eb3daaf57ab9&",
    label: "Tracker",
    alt: "Tracker icon",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a0ebdf3d37b806796ada62d7d1ca7211810337a072208ff6fc98941fc3215c5e?apiKey=4e53afb34c60481086f7eb3daaf57ab9&",
    label: "Settings",
    alt: "Settings icon",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ec600a16334d6b0595ceff6836ed02e679d04ff83e63f6e546c220447268f24?apiKey=4e53afb34c60481086f7eb3daaf57ab9&",
    label: "Log Out",
    alt: "Log out icon",
  },
];

export const SideNavigation: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-col text-xs text-black max-w-[154px]">
      <nav
        className="flex flex-col items-center px-7 pt-1.5 pb-10 w-full rounded-none bg-slate-50"
        role="navigation"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/feed7d389ef1f4cb1b74278e36f11d3f37c2d82dbdde06ccf401372e2207da36?apiKey=4e53afb34c60481086f7eb3daaf57ab9&"
          alt="Navigation header"
          className="object-contain self-stretch w-full aspect-[0.64] shadow-[1px_2px_10px_rgba(0,0,0,0.15)]"
        />
        <div className="flex flex-col items-center mt-32 space-y-11">
          {navigationItems.map((item, index) => (
            <div
              key={item.label}
              className="flex flex-col items-center"
              role="button"
              tabIndex={0}
            >
              <NavItem {...item} />
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

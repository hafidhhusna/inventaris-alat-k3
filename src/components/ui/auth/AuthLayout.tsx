import * as React from "react";
import { LoginForm } from "./LoginForm";

export function AuthLayout() {
  return (
    <div className="overflow-hidden pr-20 bg-white max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[66%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc8ac92e3fdecea4464003b096186fa8b78cd01305931b9a302c942ed148d300?apiKey=4e53afb34c60481086f7eb3daaf57ab9&"
            alt=""
            className="object-cover grow w-full aspect-[1.0] max-md:mt-10 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col ml-5 w-[60%] max-md:ml-0 max-md:max-w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

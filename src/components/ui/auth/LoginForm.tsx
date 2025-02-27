"use client";

import * as React from "react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // router.push("/signup")
    // setLoading(true); // Aktifkan loading

    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("Login results : ", result);
    setLoading(false); // Matikan loading setelah selesai

    if (result?.error) {
      setError("Invalid email or password");
    } else {
<<<<<<< HEAD
      console.log("Login Success! Redirecting...")
      router.push("/tracker");
=======
      console.log("Login Success! Redirecting...");
      router.push("/Tracker");
>>>>>>> d1ecee9ade7cfad7cb76da15ea051323e3af3aca
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mt-12 max-w-full text-lg w-[720px] max-md:mt-10 max-md:ml-1.5"
    >
      {error && <p className="text-red-500">{error}</p>}

      <InputField
        type="email"
        id="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" isLoading={loading}>
        Login
      </Button>

      <div className="flex gap-2.5 self-center mt-8 max-w-full text-sm font-light tracking-tight leading-none w-[234px]">
        <div className="grow">Or Register</div>
        <div
          className="object-contain shrink-0 w-px bg-black"
          role="separator"
          aria-hidden="true"
        />
        <div className="grow shrink w-[141px]">Forgot Your Password?</div>
      </div>
    </form>
  );
};

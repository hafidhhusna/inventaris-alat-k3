"use client";

import * as React from "react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/Tracker");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-[400px] text-base mt-6"
    >
      {error && (
        <p className="text-red-500 text-sm text-center font-medium">{error}</p>
      )}

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

      <div className="mt-4 text-sm text-center text-gray-700">
        <span className="mr-1">Don't have an account?</span>
        <Link href="/signup" className="text-blue-600 underline">
          Register
        </Link>
      </div>

      <div className="mt-2 text-sm text-center text-gray-600">
        <Link href="#" className="hover:underline">
          Forgot your password?
        </Link>
      </div>
    </form>
  );
};

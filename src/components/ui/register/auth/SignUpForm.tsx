"use client";

import * as React from "react";
import { InputField } from "./InputField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "@/components/Dropdown";

export const SignUpForm: React.FC = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const router = useRouter();

  const handleDropdownChange = (value: string) => {
    setRole(value);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      setError("All fields are required!");
      return;
    }
    setLoading(true);

    const response = await fetch(
      `${window.location.origin}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      }
    );

    if (response.ok) {
      alert("User registered successfully!");
      setLoading(false);
      router.push("/login");
    } else {
      const errorData = await response.json();
      alert(`Register Error : ${errorData.message}`);
      setError(errorData.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc7f0b30231d68c2b97f41dedbb908c94e4a7b86c5aab3673b441b3bedece3e7?placeholderIfAbsent=true&apiKey=4e53afb34c60481086f7eb3daaf57ab9"
        alt="Background"
        fill
        className="object-cover z-0"
      />

      {/* Form container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center bg-white/60 backdrop-blur-sm p-4">
        <div className="w-full max-w-md p-6 rounded-2xl shadow-2xl bg-white/90">
          <Image
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/124b28eb1ee9f3a1454957e8e9b70e9f0cd39cd097a858fc7af006d6f8b9e7ae?placeholderIfAbsent=true&apiKey=4e53afb34c60481086f7eb3daaf57ab9"
            alt="Decorative header"
            width={181}
            height={63}
            className="self-end mb-4"
          />

          <h1 className="text-2xl md:text-4xl font-semibold text-center mb-6">
            Create Your Account
          </h1>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <InputField
              placeholder="Username"
              name="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              placeholder="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Dropdown
              value={role || ""}
              onChange={(e) => handleDropdownChange(e.target.value)}
              options={[
                { label: "Admin", value: "ADMIN" },
                { label: "Pelaksana", value: "PELAKSANA" },
                { label: "Staff", value: "STAFF" },
              ]}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg font-semibold text-white bg-teal-500 hover:bg-teal-600 rounded-xl transition"
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Already have an account?
            <Link href="/login" className="text-blue-600 underline ml-1">
              Log In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

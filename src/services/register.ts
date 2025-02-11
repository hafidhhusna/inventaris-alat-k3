import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export async function register(name: string, email: string, password: string, role: string) {
  // Cek apakah email sudah digunakan
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan user baru ke database
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: Role.STAFF, // Default role
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return newUser;
}

export async function login(email: string, password: string) {
  // Cari user berdasarkan email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    throw new Error("Invalid email or password");
  }

  // Validasi password menggunakan bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Kembalikan data user tanpa password
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

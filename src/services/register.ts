import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function login(email: string, password: string) {
  // Cari user berdasarkan email
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true, // Diperlukan untuk validasi password
      role: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Validasi password menggunakan bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Kembalikan data user tanpa password
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

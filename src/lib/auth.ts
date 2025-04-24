import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/services/register";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Gunakan JWT agar CredentialsProvider bekerja
    maxAge: 8 * 60 * 60, // 8 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        try {
          const user = await login(credentials.email, credentials.password);

          if (!user) {
            return null;
          }

          console.log("User : ", user)
          return {
            id: user.id,
            name: user.name ?? "Unknown", // Ensure name is a string
            email: user.email ?? "", // Ensure email is a string
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger == "update" && session) {
        return { ...token, ...session.user };
      }
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
};

export async function getAuthSession(){
  return await getServerSession(authOptions);
}
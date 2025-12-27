import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const client = await clientPromise;
          const db = client.db("kanda");
          const adminsCollection = db.collection("admins");

          const admin = await adminsCollection.findOne({
            email: credentials.email,
          });

          if (!admin) {
            throw new Error("Invalid credentials");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            admin.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: admin._id.toString(),
            email: admin.email,
            role: admin.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/theauthadminkanda",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

import prisma from "@/backend/services/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@/generated/prisma";

import { getUserByEmail } from "@/backend/services/auth";
import { ZodError } from "zod"
import { loginSchema } from "@/backend/schemas";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null
 
          const { email, password } = await loginSchema.parseAsync(credentials);

          user = await getUserByEmail(email, password);

          if (!user) {       
            throw new Error("Invalid credentials.")
          }
        
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.role = user.role ?? Role.USER;
        token.id = user.id;
      }
      return token
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.role) {
        session.user.role = token.role as Role;
      }
      return session
    },
    async signIn({ user }) {
      if (!user.role) {
        user.role = Role.USER;
      }
      return true;
    }
  },
  session: {
    strategy: "jwt"
  },
})
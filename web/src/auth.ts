import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/services/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? 'USER';
        token.id = user.id;
      };
      return token
    },
    session({ session, token }) {
      session.user.role = token.role as string ?? 'user';
      return session
    }
  }
})
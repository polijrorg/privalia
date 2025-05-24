import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/services/prisma";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

import { loginSchema } from "./lib/zod";
import { ZodError } from "zod"
import { getUserByEmail } from "./services/user";
import { saltAndHashPassword } from "./services/password";

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
 
          const { email, password } = await loginSchema.parseAsync(credentials)

          const pwHash = await saltAndHashPassword(password)
          
          user = await getUserByEmail(email, pwHash)
          
          if (!user) {
            throw new Error("Invalid credentials.")
          }
        
          return user
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
        }
      },
    }),
  ],
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
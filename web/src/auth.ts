import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/services/prisma";
import { Role } from "@/generated/prisma";

import { getUserByEmail } from "./services/user";
import { saltAndHashPassword } from "./services/password";
import { ZodError } from "zod"
import { loginSchema } from "./utils/zod";

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
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? Role.USER;
        token.id = user.id;
      };
      return token
    },
    session({ session, token }) {
      session.user.role = (token.role as Role) ?? Role.USER
      return session
    }
  }
})
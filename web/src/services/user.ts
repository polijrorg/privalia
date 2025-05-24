import { comparePassword } from "./password";
import prisma from "./prisma";

export async function getUserByEmail(email: string, plainPassword: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) return null;

  const isValid = await comparePassword(plainPassword, user.password);
  if (!isValid) return null;
  return user;
}
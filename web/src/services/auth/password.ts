import { hash, compare } from "bcryptjs";

export async function saltAndHashPassword(plainPassword: string): Promise<string> {
  const SALT_ROUNDS = 10;
  return await hash(plainPassword, SALT_ROUNDS);
}

export async function comparePassword(plainPassword: string, password: string) {
  return compare(plainPassword, password);
}
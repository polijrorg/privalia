import type { Role } from "@/generated/prisma";
import prisma from "@/backend/services/db";

interface CreateUserProps {
  name: string, email: string, password: string, role: Role
}

export async function createUser({ name, email, password, role }: CreateUserProps) {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
      role: role ?? "USER",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    }
  });
}
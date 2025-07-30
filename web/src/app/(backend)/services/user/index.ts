import type { Role } from "@/generated/prisma";
import prisma from "@/backend/services/db";

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  })
}

interface CreateUserProps {
  name: string, email: string, password: string, role: Role
}

export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: { id }
  });
}

export async function updateUser(id: string, data: Partial<CreateUserProps>) {
  return await prisma.user.update({
    where: { id },
    data: {
      ...data,
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
import prisma from '@/backend/services/db';
import { Item } from '@/generated/prisma';

export async function createItem(data: Item, auditId: string, userId: string) {
  return prisma.item.create({
    data: {
      ...data,
      auditId,
      userId
    },
  });
}

export async function getItems(auditId: string){
    return prisma.item.findMany({
        where: { auditId },
        select: {
            id: true,
            ean: true,
            resultado: true,
            divergencia: true,
            imagem_divergente: true,
            auditoria: {
                select: {
                    id: true,
                    name: true
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });
}

export async function deleteItem(id: string) {
    return prisma.item.delete({
        where: { id },
    });
}

export async function updateItem(id: string, data: Item) {
    return await prisma.item.update({
        where: { id },
        data: {
            ...data
        },
        select: {
            id: true,
            ean: true,
            resultado: true,
            divergencia: true,
            imagem_divergente: true,
            auditoria: {
                select: {
                    id: true,
                    name: true
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
}
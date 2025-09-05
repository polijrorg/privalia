import prisma from '@/backend/services/db';
import { Item } from '@/generated/prisma';

type ItemWithOutId = Omit<Item, 'id' | 'auditId' | 'userId'| 'data'>;

export async function createItem(data: ItemWithOutId, auditId: string, userId: string) {
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
        where: { auditId }
    });
}

export async function deleteItem(id: string) {
    return prisma.item.delete({
        where: { id },
    });
}

export async function updateItem(id: string, data: Partial<ItemWithOutId>) {
    return await prisma.item.update({
        where: { id },
        data: {
            ...data
        }
    })
}
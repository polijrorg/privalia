import prisma from '@/backend/services/db';

export async function createItem(data: any, auditId: string, userId: string) {
  return prisma.item.create({
    data: {
      ...data,
      auditId,
      userId
    },
    include: {
      auditoria: true,
      user: true,
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
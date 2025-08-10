 
import prisma from '@/backend/services/db';
import { Auditoria } from '@/generated/prisma';

//create type for auditoria withou id 
type AuditoriaCreate = Omit<Auditoria, 'id'| 'userId'>;

export async function findAuditoriaById(id: string){
    return await prisma.auditoria.findUnique({
        where: { id },
        include: {
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

export async function createAuditoria(data: AuditoriaCreate, userId: string) {
  return prisma.auditoria.create({
    data: {
      ...data,
      userId
    },
    include: {
      user: true,
    },
  });
}

export async function getAuditorias(){
    return prisma.auditoria.findMany({
        select: {
            id: true,
            name: true,
            categoria: true,
            amostra: true,
            total_pecas: true,
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

export async function deleteAuditoria(id: string) {
    return prisma.auditoria.delete({
        where: { id },
    });
}

export async function updateAuditoria(id: string, data: Partial<AuditoriaCreate>) {
    return await prisma.auditoria.update({
        where: { id },
        data: {
            ...data
        },
        select: {
            id: true,
            name: true,
            categoria: true,
            amostra: true,
            total_pecas: true,
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
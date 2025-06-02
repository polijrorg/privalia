import prisma from '../db';

export async function getAllMaterias() {
  try {
    const materias = await prisma.materia.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return materias
  } catch (error) {
    throw new Error(String(error) || 'Falha ao buscar matérias')
  }
}

export async function createMateria(data: { 
  name: string; 
  descricao: string; 
  cor: string; 
  slug: string; 
}) {
  try {
    const materia = await prisma.materia.create({
      data: {
        name: data.name,
        descricao: data.descricao,
        cor: data.cor,
        slug: data.slug
      }
    })
    return materia
  } catch (error) {
    throw new Error(String(error) || 'Falha ao criar matéria')
  }
}
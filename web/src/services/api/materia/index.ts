import { Context } from '@/context'

export async function getAllMaterias(ctx: Context) {
  try {
    const materias = await ctx.prisma.materia.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return materias
  } catch (error) {
    throw new Error(String(error) || 'Falha ao buscar matérias')
  }
}

export async function createMateria(ctx: Context, data: { 
  name: string; 
  descricao: string; 
  cor: string; 
  slug: string; 
}) {
  try {
    const materia = await ctx.prisma.materia.create({
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
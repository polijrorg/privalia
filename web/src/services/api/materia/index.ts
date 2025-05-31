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
    throw new Error(String(error) || 'Failed to fetch materias')
  }
}
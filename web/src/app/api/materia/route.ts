import { NextResponse } from 'next/server'
import prisma from '@/services/db'
import { createMateria, getAllMaterias } from '@/services/api/materia'
import { auth } from '@/auth';
import { createMateriaSchema } from '@/utils/zod/materia.schema';
import { zodErrorHandler } from '@/utils';

const allowedRoles = {
  POST: ["SUPER_ADMIN", "ADMIN"]
}

export async function GET() {
  try {
    const ctx = { prisma }
    const materias = await getAllMaterias(ctx)

    return NextResponse.json(materias, { status: 200 })
  } catch (error) {
    console.error('Erro ao buscar matérias:', error)
    return NextResponse.json(
      { error: 'Falha ao buscar matérias' },
      { status: 500 }
    )
  }
}

export const POST = auth(async (request) => {
  try {
    if (!request.auth) {
      return NextResponse.json(
        { error: 'Não autorizado - Faça login para continuar' },
        { status: 401 }
      )
    }
    
    const userRole = request.auth.user?.role;
    
    if (!userRole || !allowedRoles.POST.includes(userRole)) {
      return NextResponse.json(
        { error: 'Acesso negado - Permissões insuficientes' },
        { status: 403 }
      )
    }

    let body;
    try {
      body = await request.json()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return NextResponse.json(
        { error: 'Formato de dados inválido - JSON malformado' },
        { status: 400 }
      )
    }

    const validationResult = createMateriaSchema.safeParse(body)
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        campo: err.path.join('.'),
        mensagem: err.message
      }))
      
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          detalhes: errors
        },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data

    const ctx = { prisma }
    const materia = await createMateria(ctx, validatedData)

    return NextResponse.json(materia, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar matéria:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        if (error.message.includes('slug')) {
          return NextResponse.json(
            { error: 'Uma matéria com esse slug já existe' },
            { status: 409 }
          )
        }
        return NextResponse.json(
          { error: 'Uma matéria com esses dados já existe' },
          { status: 409 }
        )
      }
      
      if (error.message.includes('Prisma')) {
        return NextResponse.json(
          { error: 'Erro no banco de dados - Verifique os dados fornecidos' },
          { status: 400 }
        )
      }
    }

    return zodErrorHandler(error);
  }
})
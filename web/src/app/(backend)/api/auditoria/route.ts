import { NextRequest, NextResponse } from 'next/server';
import { blockForbiddenRequests, returnInvalidDataErrors, validBody, zodErrorHandler } from '@/utils';
import type { AllowedRoutes } from '@/types';
import { createAuditoriaSchema } from '../../schemas/auditoria.schema';
import { auth } from '@/auth';
import { createAuditoria, getAuditorias } from '../../services/auditoria';

const allowedRoles: AllowedRoutes = {
  POST: ["SUPER_ADMIN", "ADMIN"]
};

export async function POST(request: NextRequest) {
  try {

    const session = await auth.api.getSession(request);

    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json(
        { error: 'Usuario não encontrado' },
        { status: 404 }
      );
    }
    //const existingUser = await getUserById(userId);


    const body = await validBody(request);

    const validationResult = createAuditoriaSchema.safeParse(body);
    if (!validationResult.success) {
      return returnInvalidDataErrors(validationResult);
    }

    const validatedData = validationResult.data;
    const auditoria = await createAuditoria(validatedData, userId);
    return NextResponse.json(auditoria, { status: 201 });
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }

    if (error instanceof Error) {
      if (error.message.includes('Prisma')) {
        return NextResponse.json(
          { error: 'Erro no banco de dados - Verifique os dados fornecidos' },
          { status: 400 }
        );
      }
    }

    return zodErrorHandler(error);
  }
}

export async function GET() {
    try {
        const auditorias = await getAuditorias();
        return NextResponse.json(auditorias, { status: 200 });
    }catch (error) {
        console.error('Erro ao ler auditorias:', error);
        return NextResponse.json(
            { error: 'Erro ao ler auditorias' },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { returnInvalidDataErrors, validBody, zodErrorHandler } from '@/utils';
import { auth } from '@/auth';
import { findAuditoriaById } from '../../../services/auditoria';
import { createItem, getItems } from '../../../services/item';
import { createItemSchema } from '../../../schemas/item.schema';

//estou fazendo com que apenas o susuario que criou a auditoria possa criar itens nela
//ver se o usuario que não criou a auditoria pode criar itens nessa auditoria
export async function POST(request: NextRequest, { params}: { params: Promise<{ auditoriaId: string}>}) {
    try{

        const session = await auth.api.getSession(request);

        const userId = session?.user.id;
        if (!userId) {
          return NextResponse.json(
            { error: 'Usuario não encontrado' },
            { status: 404 }
          );
        }

        const body = await validBody(request);

        const auditId = (await params).auditoriaId;

        //Precisa dessa parte?
        const existingAuditoria = await findAuditoriaById(auditId);

        if (!existingAuditoria) {
            return NextResponse.json(
                { error: "Auditoria não encontrada" },
                { status: 404 }
            );
        }
/*
        if (existingAuditoria.user.id !== userId) {
          return NextResponse.json(
            { error: "Você não tem permissão para adicionar itens nesta auditoria" },
            { status: 403 }
          );
        }
*/
        const validationResult = createItemSchema.safeParse(body);
        if (!validationResult.success) {
            return returnInvalidDataErrors(validationResult);
        }

        const validatedData = validationResult.data;
        const item = await createItem(validatedData, auditId, userId);

        return NextResponse.json(item, { status: 201 });

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

//ver se get items são todos ou só os da auditoria
export async function GET(request: NextRequest, context: { params: Promise<{ auditoriaId: string }> }) {
  try {
    const audId = (await context.params).auditoriaId;
    console.log('auditId recebido:', audId);
    if (!audId) {
      return NextResponse.json(
        { error: "ID da auditoria não fornecido" },
        { status: 400 }
      );
    }
    //Precisa dessa parte?
    const existingAuditoria = await findAuditoriaById(audId);
    console.log("Resultado da busca:", existingAuditoria);

    if (!existingAuditoria) {
      return NextResponse.json(
        { error: "Auditoria não encontrada" },
        { status: 404 }
      );
    }
    
    const items = await getItems(audId);
    return NextResponse.json(items, { status: 200 });

  }catch (error) {
    console.error('Erro ao ler itens:', error);
    return NextResponse.json(
      { error: 'Erro ao ler itens' },
      { status: 500 }
    );
  }
}
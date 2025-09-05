import { NextRequest, NextResponse } from "next/server";

import { updateUserSchema } from "@/backend/schemas";
import { returnInvalidDataErrors, validBody, zodErrorHandler } from "@/utils/api";
import { deleteUser, updateUser } from "@/app/(backend)/services/user";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id: userId} = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "ID do usuário não fornecido" },
        { status: 400 }
      );
    }

    const deletedUser = await deleteUser(userId);

    if (!deletedUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Usuário deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar usuário' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const {id: userId} = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "ID do usuário não fornecido" },
        { status: 400 }
      );
    }

    const body = await validBody(request);
    const validationResult = updateUserSchema.safeParse(body);

    if (!validationResult.success) {
      return returnInvalidDataErrors(validationResult);
    }

    const validatedData = validationResult.data;
    const { name, email } = validatedData;

    const updatedUser = await updateUser(userId, { name, email});

    return NextResponse.json(
      { 
        message: "Usuário atualizado com sucesso",
        user: updatedUser 
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }

    return zodErrorHandler(error);
  }
}
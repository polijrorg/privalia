import { NextRequest, NextResponse } from "next/server";

import { saltAndHashPassword } from "@/backend/services/auth";
import { registerSchema } from "@/backend/schemas";
import { returnInvalidDataErrors, validBody, zodErrorHandler } from "@/utils/api";
import { createUser, getUsers, deleteUser, findUserByEmail } from "../../services/user";

export async function POST(request: NextRequest) {
  try {
    const body = await validBody(request);
    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return returnInvalidDataErrors(validationResult);
    }
    
    const validatedData = validationResult.data

    const { name, email, password } = validatedData;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { 
          error: "Usuário já existe",
          field: "email" 
        },
        { status: 409 }
      );
    }    
    
    const hashedPassword = await saltAndHashPassword(password);

    const user = await createUser({ name, email, password: hashedPassword, role: "USER" });
    
    return NextResponse.json(
      { 
        message: "Usuário criado com sucesso",
        user 
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }

    return zodErrorHandler(error);    
  }
}

export async function GET() {
  try{
    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
  }catch (error) {
    console.error('Erro ao ler usuários:', error)
    return NextResponse.json(
      { error: 'Erro ao ler usuários' },
      { status: 500 }
    )
  }
}
/*
export async function DELETE(id: string) {
  try {
    if (!id) {
      return NextResponse.json(
        { error: "ID do usuário é obrigatório" },
        { status: 400 }
      );
    }

    await deleteUser(id);

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
}*/
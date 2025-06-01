import { saltAndHashPassword } from "@/services/auth/password";
import prisma from "@/services/db";
import { zodErrorHandler } from "@/utils/api";
import { registerSchema } from "@/utils/zod";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return NextResponse.json(
        { 
          error: "Usuário já existe",
          field: "email" 
        },
        { status: 409 }
      );
    }    
    
    const hashedPassword = await saltAndHashPassword(validatedData.password);

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: "USER"
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });
    
    return NextResponse.json(
      { 
        message: "Usuário criado com sucesso",
        user 
      },
      { status: 201 }
    );
  } catch (error) {
    return zodErrorHandler(error);    
  }
}
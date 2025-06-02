import { ZodError } from "zod";
import { NextResponse } from "next/server";

export * from './blockRequest'
export * from './validBody'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function zodErrorHandler(error: any) {
  if (error instanceof ZodError) {
    const fieldErrors = error.errors.reduce((acc, err) => {
      const field = err.path[0];
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(err.message);
      return acc;
    }, {} as Record<string, string[]>);

    return NextResponse.json(
      { 
        error: "Dados inválidos",
        fieldErrors,
        messages: error.errors.map(err => err.message)
      },
      { status: 400 }
    );
  }
    
  return NextResponse.json(
    { error: "Erro interno do servidor" },
    { status: 500 }
  );
}
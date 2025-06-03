import type { Role } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth";

export function blockForbiddenRequests(request: NextAuthRequest, allowedRoles?: Role[]) {
  if (!request?.auth) {
    throw NextResponse.json(
      { error: 'Não autorizado - Faça login para continuar' },
      { status: 401 }
    )
  }
  
  const userRole = request.auth.user?.role;
  
  if (!userRole || !allowedRoles?.includes(userRole)) {
    throw NextResponse.json(
      { error: 'Acesso negado - Permissões insuficientes' },
      { status: 403 }
    )
  }
}
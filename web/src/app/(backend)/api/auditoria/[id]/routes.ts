import { NextRequest, NextResponse } from "next/server";

import { returnInvalidDataErrors, validBody } from "@/utils/api";
import { deleteAuditoria, updateAuditoria } from "@/app/(backend)/services/auditoria";
import { patchAuditoriaSchema } from "@/app/(backend)/schemas/auditoria.schema";

export async function DELETE(request: NextRequest, { params}: { params: { id: string}}) {
    try {
        const auditoriaId = params.id;
        
        if (!auditoriaId) {
            return NextResponse.json(
                { error: "ID da auditoria não fornecido" },
                { status: 400 }
            );
        }
        const deletedAuditoria = await deleteAuditoria(auditoriaId);

        if (!deletedAuditoria) {
            return NextResponse.json(
                { error: "Auditoria não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Auditoria deletada com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao deletar auditoria:', error);
        return NextResponse.json(
            { error: 'Erro ao deletar auditoria' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params}: {params: { id: string } }) {
    try {
        const auditoriaId = params.id;
        if (!auditoriaId) {
            return NextResponse.json(
                { error: "ID da auditoria não fornecido" },
                { status: 400 }
            );
        }

        const body = await validBody(request);
        const validationResult = patchAuditoriaSchema.safeParse(body);

        if (!validationResult.success) {
            return returnInvalidDataErrors(validationResult);
        }

        const validatedData = validationResult.data;
        // const { name, categoria, amostra, total_pecas } = validatedData;

        const updatedAuditoria = await updateAuditoria(auditoriaId, validatedData);
        return NextResponse.json(
            { 
                message: "Auditoria atualizada com sucesso",
                auditoria: updatedAuditoria
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao atualizar auditoria:', error);
        return NextResponse.json(
            { error: 'Erro ao atualizar auditoria' },
            { status: 500 }
        );
    }
}
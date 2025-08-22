import { NextRequest, NextResponse } from 'next/server';
//import { returnInvalidDataErrors, validBody, zodErrorHandler } from '@/utils';
//import { createAuditoriaSchema } from '../../../../schemas/auditoria.schema';
//import { auth } from '@/auth';
import { findAuditoriaById } from '../../../../services/auditoria';
import { gerarAuditoriaPdf } from '@/app/(backend)/services/auditoriaPDF';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    try {
        const { id: auditoriaId } = await params;
        console.log('Gerando PDF para a auditoria');

        const auditoria = await findAuditoriaById(auditoriaId);

        if (!auditoria) {
            return NextResponse.json(
                { error: 'Auditoria não encontrada' },
                { status: 404 }
            );
        }

        const pdfBuffer = await gerarAuditoriaPdf(auditoria);

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="auditoria_${auditoriaId}.pdf"`,
            },
        });
    } catch (error) {
        console.error('Erro ao gerar PDF da auditoria:', error);
        return NextResponse.json(
            { error: 'Erro ao gerar PDF da auditoria' },
            { status: 500 }
        );
    }
}
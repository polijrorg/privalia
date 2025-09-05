import { NextRequest, NextResponse } from 'next/server';
import { findAuditoriaById } from '../../../../services/auditoria';
import { gerarAuditoriaCsv } from '@/app/(backend)/services/auditoriaCSV';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    try{
        const { id: auditoriaId } = await params;
        console.log('Gerando CSV para a auditoria');

        const auditoria = await findAuditoriaById(auditoriaId);

        if (!auditoria) {
            return NextResponse.json(
                { error: 'Auditoria não encontrada' },
                { status: 404 }
            );
        }

        const csvContent = await gerarAuditoriaCsv(auditoria);

        return new NextResponse(csvContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="auditoria_${auditoriaId}.csv"`,
            },
        });
    } catch (error){
        console.error('Erro ao gerar CSV da auditoria:', error);
        return NextResponse.json(
            { error: 'Erro ao gerar CSV da auditoria' },
            { status: 500 }
        );
    }
}
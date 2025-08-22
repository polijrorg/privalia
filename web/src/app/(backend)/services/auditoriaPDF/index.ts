import { Auditoria, Item } from '@/generated/prisma';

import pdfMake from 'pdfmake/build/pdfmake';

// A atribuição mais segura: tenta acessar a propriedade `pdfMake.vfs`
// diretamente ou, como fallback, a partir da propriedade `default` (comum em CJS).
// O operador `||` garante que se o primeiro falhar, o segundo será tentado.
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// A correção: Trate o objeto importado como 'any' para evitar erros de tipagem
// O operador `||` garante que se o primeiro falhar, o segundo será tentado.
const vfsData = (pdfFonts as any)?.pdfMake?.vfs || (pdfFonts as any)?.default?.pdfMake?.vfs;

if (vfsData) {
    pdfMake.vfs = vfsData;
    // Opcional: Para usar as fontes, você precisa definir a fonte padrão.
    pdfMake.fonts = {
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-MediumItalic.ttf'
        }
    };
} else {
    // Lança um erro se não for possível carregar as fontes.
    throw new Error("Não foi possível carregar as fontes necessárias para o pdfmake.");
}

const generateItemsTable = (itens: Item[]) : (string | any )[][] => {
    const body : (string | any )[][] = [[ "EAN", "DATA", "RESULTADO", "DIVERGÊNCIA", "IMAGEM_DIVERGENTE", "ENDEREÇO" ]]
;
    itens.forEach((item) => {
        body.push([
            item.ean,
            item.data ? item.data.toISOString().split('T')[0] : '',
            item.resultado,
            item.divergencia,
            item.imagem_divergente,
            item.endereco_fisico
        ]);
    });

    return body;    
}

export async function gerarAuditoriaPdf(auditoria: Auditoria & { itens: Item[] }) : Promise<Buffer> {

    const docDefinition: any = {
        content: [
            { text: "Relatório de Auditoria - Privalia", style: "header" },
            { text: 'Auditoria: ' + auditoria.name, style: "subheader" },
            { text: 'Processo: ' + auditoria.categoria, style: "subheader" },
            { text: 'Amostra: ' + auditoria.amostra, style: "subheader" },
            { text: 'Total de Peças: ' + auditoria.total_pecas, style: "subheader" },
            { text: 'Auditor:', style: "subheader" },

            {
            columns: [
                { text: 'Data_Inicio: ' + auditoria.data_inicio.toISOString().split('T')[0], width : "50%" },
                { text: 'Data_Fim: ' + (auditoria.data_fim ? auditoria.data_fim.toISOString().split('T')[0] : 'N/A'), width : "50%" },
                { text: 'PO: ' + (auditoria.PO || 'N/A'), width : "50%" },
                { text: 'Fornecedor: ' + auditoria.fornecedor, width : "50%" },
                { text: 'Status: ' + auditoria.status, width : "50%" },
                { text: 'ID Externo: ' + (auditoria.idExterno || 'N/A'), width : "50%" },
                { text: 'Modelo Negócio: ' + auditoria.modelo_negocio, width : "50%" },
                { text: 'Pedido: ' + (auditoria.pedido || 'N/A'), width : "50%" }
            ]
            },

            { text: 'Itens Auditados:', style: "subheader" },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: generateItemsTable(auditoria.itens)
                },
                layout: {
                    fillColor: function (rowIndex: number) {
                        return rowIndex === 0 ? "#e91e63" : null;
                    },
                    hLineWidth: function (i: number, node: any) {
                        return 1;
                    },
                    vLinewidth: function (i: number, node: any) {
                        return 1;
                    }
                }

            }
        ],
        styles: {
            header : {
                fontSize: 18,
                bold: true,
                color: "#9c27b0"
            },
            subheader: {
                fontSize: 14,
                bold: true,
                margin: [0, 5, 0, 2]
            },
            tableExample: {
                margin: [0, 10, 0, 10]
            }
        },
        defaultStyle: {
            fontSize: 10,
            font: 'Helvetica'
        }
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    return new Promise<Buffer>((resolve) => {
        pdfDocGenerator.getBuffer((buffer: any) => {
            resolve(Buffer.from(buffer));
        });
    });

}
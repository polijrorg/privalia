import { Auditoria, Item } from '@/generated/prisma';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

// Gerador da tabela de itens
const generateItemsTable = (itens: Item[]): (string | any)[][] => {
  const body: (string | any)[][] = [
    ["EAN", "DATA", "RESULTADO", "DIVERGÊNCIA", "IMAGEM_DIVERGENTE", "ENDEREÇO"]
  ];

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
};

// ⚡ Função principal
export async function gerarAuditoriaPdf(
  auditoria: Auditoria & { itens: Item[] }
): Promise<Buffer> {
  // Configuração das fontes: só as internas do pdfmake (Helvetica)
  const fonts = {
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique',
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition: TDocumentDefinitions = {
    content: [
      { text: "Relatório de Auditoria - Privalia", style: "header" },
      { text: 'Auditoria: ' + auditoria.name, style: "subheader" },
      { text: 'Processo: ' + auditoria.categoria, style: "subheader" },
      { text: 'Amostra: ' + auditoria.amostra, style: "subheader" },
      { text: 'Total de Peças: ' + auditoria.total_pecas, style: "subheader" },
      { text: 'Auditor:', style: "subheader" },

      {
        columns: [
          { text: 'Data_Inicio: ' + auditoria.data_inicio.toISOString().split('T')[0], width: "50%" },
          { text: 'Data_Fim: ' + (auditoria.data_fim ? auditoria.data_fim.toISOString().split('T')[0] : 'N/A'), width: "50%" },
          { text: 'PO: ' + (auditoria.PO || 'N/A'), width: "50%" },
          { text: 'Fornecedor: ' + auditoria.fornecedor, width: "50%" },
          { text: 'Status: ' + auditoria.status, width: "50%" },
          { text: 'ID Externo: ' + (auditoria.idExterno || 'N/A'), width: "50%" },
          { text: 'Modelo Negócio: ' + auditoria.modelo_negocio, width: "50%" },
          { text: 'Pedido: ' + (auditoria.pedido || 'N/A'), width: "50%" },
        ],
      },

      { text: 'Itens Auditados:', style: "subheader" },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*', '*', '*'],
          body: generateItemsTable(auditoria.itens),
        },
        layout: {
          fillColor: (rowIndex: number) => rowIndex === 0 ? "#e91e63" : null,
          hLineWidth: () => 1,
          vLineWidth: () => 1,
        },
      },
    ],
    styles: {
      header: { fontSize: 18, bold: true, color: "#9c27b0" },
      subheader: { fontSize: 14, bold: true, margin: [0, 5, 0, 2] },
      tableExample: { margin: [0, 10, 0, 10] },
    },
    defaultStyle: {
      fontSize: 10,
      font: 'Helvetica', // só usa fontes internas
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  return new Promise<Buffer>((resolve) => {
    const chunks: Buffer[] = [];
    pdfDoc.on('data', (chunk) => chunks.push(chunk));
    pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
    pdfDoc.end();
  });
}

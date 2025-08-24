import { Prisma } from '@/generated/prisma';

// ✅ Type-safe auditoria with items (mesmo tipo do PDF)
type AuditoriaWithItens = Prisma.AuditoriaGetPayload<{
  include: { itens: true };
}>;

// 🔧 Helper para formatar data
function formatDate(date: Date | null): string {
  if (!date) return 'N/A';
  return new Date(date).toISOString().split('T')[0];
}

// 🔧 Helper para escapar valores CSV
function escapeCsvValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // Se contém vírgula, quebra de linha ou aspas, envolve com aspas duplas
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Generate CSV
export async function gerarAuditoriaCsv(auditoria: AuditoriaWithItens): Promise<string> {
  try {
    // Cabeçalho do CSV - baseado no template HTML
    const headers = [
      'Auditoria',
      'Processo',
      'Amostra',
      'Total de Peças',
      'Data Início',
      'Data Fim',
      'PO',
      'Fornecedor',
      'Status',
      'ID Externo',
      'Modelo Negócio',
      'Pedido',
      'EAN',
      'Data Item',
      'Resultado',
      'Divergência',
      'Imagem Divergente',
      'Endereço'
    ];

    // Linhas de dados
    const rows: string[][] = [];
    
    if (auditoria.itens && auditoria.itens.length > 0) {
      // Para cada item, cria uma linha com dados da auditoria + item
      auditoria.itens.forEach(item => {
        rows.push([
          auditoria.name || '',
          auditoria.categoria || '',
          auditoria.amostra?.toString() || '',
          auditoria.total_pecas?.toString() || '',
          formatDate(auditoria.data_inicio),
          formatDate(auditoria.data_fim),
          auditoria.PO || '',
          auditoria.fornecedor || '',
          auditoria.status || '',
          auditoria.idExterno || '',
          auditoria.modelo_negocio || '',
          auditoria.pedido || '',
          item.ean || '',
          formatDate(item.data),
          item.resultado || '',
          item.divergencia || '',
          item.imagem_divergente || '',
          item.endereco_fisico || ''
        ]);
      });
    } else {
      // Se não há itens, pelo menos uma linha com dados da auditoria
      rows.push([
        auditoria.name || '',
        auditoria.categoria || '',
        auditoria.amostra?.toString() || '',
        auditoria.total_pecas?.toString() || '',
        formatDate(auditoria.data_inicio),
        formatDate(auditoria.data_fim),
        auditoria.PO || '',
        auditoria.fornecedor || '',
        auditoria.status || '',
        auditoria.idExterno || '',
        auditoria.modelo_negocio || '',
        auditoria.pedido || '',
        '',
        '',
        '',
        '',
        '',
        ''
      ]);
    }

    // Montagem do CSV
    const csvLines = [];
    
    // Adiciona cabeçalho
    csvLines.push(headers.map(escapeCsvValue).join(','));
    
    // Adiciona dados
    rows.forEach(row => {
      csvLines.push(row.map(escapeCsvValue).join(','));
    });

    // Adiciona BOM para suporte a UTF-8 no Excel
    const bom = '\uFEFF';
    return bom + csvLines.join('\n');

  } catch (error) {
    console.error('Erro ao gerar CSV:', error);
    throw new Error('Falha na geração do CSV');
  }
}
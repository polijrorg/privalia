import { Auditoria, Item } from '@/generated/prisma';
import puppeteer from 'puppeteer';

// Função para gerar HTML do relatório
const generateReportHTML = (auditoria: Auditoria & { itens: Item[] }): string => {
  const itemsRows = auditoria.itens.map(item => `
    <tr>
      <td>${item.ean || ''}</td>
      <td>${item.data ? item.data.toISOString().split('T')[0] : ''}</td>
      <td>${item.resultado || ''}</td>
      <td>${item.divergencia || ''}</td>
      <td>${item.imagem_divergente || ''}</td>
      <td>${item.endereco_fisico || ''}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Relatório de Auditoria</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          font-size: 12px;
          line-height: 1.4;
        }
        .header {
          font-size: 24px;
          font-weight: bold;
          color: #e91e63 ;
          margin-bottom: 20px;
          text-align: center;
        }
        .section {
          margin-bottom: 15px;
        }
        .section-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
          color: #333;
          border-bottom: 2px solid #7A4EBE;
          padding-bottom: 5px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }
        .info-item {
          background: #f5f5f5;
          padding: 8px;
          border-radius: 4px;
        }
        .info-label {
          font-weight: bold;
          color: #555;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
          font-size: 10px;
        }
        th {
          background-color: #e91e63;
          color: white;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        @media print {
          body { margin: 0; }
          .header { color: #000 !important; }
          th { background-color:  #e91e63  !important; }
        }
      </style>
    </head>
    <body>
      <div class="header">Relatório de Auditoria - Privalia</div>
      
      <div class="section">
        <div class="section-title">Informações da Auditoria</div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Auditoria:</span> ${auditoria.name}
          </div>
          <div class="info-item">
            <span class="info-label">Processo:</span> ${auditoria.categoria}
          </div>
          <div class="info-item">
            <span class="info-label">Amostra:</span> ${auditoria.amostra}
          </div>
          <div class="info-item">
            <span class="info-label">Total de Peças:</span> ${auditoria.total_pecas}
          </div>
          <div class="info-item">
            <span class="info-label">Data Início:</span> ${auditoria.data_inicio.toISOString().split('T')[0]}
          </div>
          <div class="info-item">
            <span class="info-label">Data Fim:</span> ${auditoria.data_fim ? auditoria.data_fim.toISOString().split('T')[0] : 'N/A'}
          </div>
          <div class="info-item">
            <span class="info-label">PO:</span> ${auditoria.PO || 'N/A'}
          </div>
          <div class="info-item">
            <span class="info-label">Fornecedor:</span> ${auditoria.fornecedor}
          </div>
          <div class="info-item">
            <span class="info-label">Status:</span> ${auditoria.status}
          </div>
          <div class="info-item">
            <span class="info-label">ID Externo:</span> ${auditoria.idExterno || 'N/A'}
          </div>
          <div class="info-item">
            <span class="info-label">Modelo Negócio:</span> ${auditoria.modelo_negocio}
          </div>
          <div class="info-item">
            <span class="info-label">Pedido:</span> ${auditoria.pedido || 'N/A'}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Itens Auditados (${auditoria.itens.length} itens)</div>
        <table>
          <thead>
            <tr>
              <th>EAN</th>
              <th>DATA</th>
              <th>RESULTADO</th>
              <th>DIVERGÊNCIA</th>
              <th>IMAGEM_DIVERGENTE</th>
              <th>ENDEREÇO</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `;
};

// ⚡ Função principal usando Puppeteer
export async function gerarAuditoriaPdf(
  auditoria: Auditoria & { itens: Item[] }
): Promise<Buffer> {
  
  let browser;
  
  try {
    console.log('🔄 Iniciando geração do PDF com Puppeteer...');
    
    // Inicializar browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    console.log('✅ Browser iniciado');
    
    const page = await browser.newPage();
    
    // Gerar HTML
    const html = generateReportHTML(auditoria);
    console.log('✅ HTML gerado');
    
    // Configurar página
    await page.setContent(html);
    
    // Gerar PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      }
    });
    
    console.log('✅ PDF gerado com sucesso, tamanho:', pdfBuffer.length);
    
    return Buffer.from(pdfBuffer);
    
  } catch (error) {
    console.error('❌ Erro ao gerar PDF com Puppeteer:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
      console.log('✅ Browser fechado');
    }
  }
}
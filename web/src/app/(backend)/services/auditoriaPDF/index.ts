import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import { Prisma } from '@/generated/prisma';

// ✅ Type-safe auditoria with items
type AuditoriaWithItens = Prisma.AuditoriaGetPayload<{
  include: { itens: true };
}>;

// 🔧 Register helpers (format dates etc.)
Handlebars.registerHelper('formatDate', (date: Date | null) => {
  if (!date) return 'N/A';
  return new Date(date).toISOString().split('T')[0];
});

// Load and compile template once
const templatePath = path.join(process.cwd(), 'src', 'templates', 'relatorioTemplate.hbs');
const templateSource = fs.readFileSync(templatePath, 'utf8');
const template = Handlebars.compile(templateSource);

// Generate PDF
export async function gerarAuditoriaPdf(auditoria: AuditoriaWithItens): Promise<Buffer> {
  let browser;
  try {
    const html = template(auditoria);

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    if (browser) await browser.close();
  }
}
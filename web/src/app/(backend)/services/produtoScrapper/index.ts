import puppeteer from 'puppeteer';

// Type para o produto
interface ProdutoPrivalia {
  sku: string;
  description: string;
  codigoProduto: string;
  composicao: string;
  commercialRef: string;
  brand: string;
  size: string;
  color: string;
  physicalRef: string;
  ean: string;
  name: string;
  imageUrl?: string;
}

export async function scrapeProduto(sku: string): Promise<ProdutoPrivalia | null> {
  let browser;
  
  try {
    const url = `https://bobr.privalia.com/productcollector/getproduct/sku/${sku}`;
    // URL da imagem segue padrão previsível
    const imageUrl = `https://bobr.privalia.com/productcollector/imagefromsku/sku/${sku}`;
    
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Set user agent para evitar bloqueios
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Navegar para a página
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Extrair dados da página
    const produtoData = await page.evaluate((imgUrl) => {
      const fullText = document.body.textContent || '';
      
      // Usar regex para extrair informações específicas
      const skuMatch = fullText.match(/SKU:(\w+)/);
      const descriptionMatch = fullText.match(/Description:(.+?)(?=\n|Estampa|Código|$)/);
      const codigoMatch = fullText.match(/Código Do Produto:\s*(\w+)/);
      const composicaoMatch = fullText.match(/Composição:\s*(.+?)(?=\n|O produto)/);
      const commercialRefMatch = fullText.match(/CommercialRef:(\w+)/);
      const brandMatch = fullText.match(/Brand:(.+?)(?=\n|Size)/);
      const sizeMatch = fullText.match(/Size:(\w+)/);
      const colorMatch = fullText.match(/Color:(.+?)(?=\n|PhysicalRef)/);
      const physicalRefMatch = fullText.match(/PhysicalRef:(.+?)(?=\n|EAN)/);
      const eanMatch = fullText.match(/EAN:(\d+)/);
      const nameMatch = fullText.match(/Name:(.+?)$/m);

      return {
        sku: skuMatch?.[1] || '',
        description: descriptionMatch?.[1]?.trim() || '',
        codigoProduto: codigoMatch?.[1] || '',
        composicao: composicaoMatch?.[1]?.trim() || '',
        commercialRef: commercialRefMatch?.[1] || '',
        brand: brandMatch?.[1]?.trim() || '',
        size: sizeMatch?.[1] || '',
        color: colorMatch?.[1]?.trim() || '',
        physicalRef: physicalRefMatch?.[1]?.trim() || '',
        ean: eanMatch?.[1] || '',
        name: nameMatch?.[1]?.trim() || '',
        imageUrl: imgUrl // Usar a URL padrão da Privalia
      };
    }, imageUrl);

    // Validar se encontrou dados essenciais
    if (!produtoData.sku && !produtoData.ean) {
      console.log('Produto não encontrado ou página inválida');
      return null;
    }

    return produtoData as ProdutoPrivalia;

  } catch (error) {
    console.error('Erro no scraping:', error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
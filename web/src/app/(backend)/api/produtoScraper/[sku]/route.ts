import { NextRequest, NextResponse } from 'next/server';
import { scrapeProduto } from '../../../services/produtoScrapper';

export async function GET(request: NextRequest, { params }: { params: Promise<{ sku: string }>}){
    try{
        console.log('Rota chamada');
        const { sku } = await params;

        if(!sku){
            return NextResponse.json(
                { error: 'SKU é obrigatório' },
                { status: 400 }
            );
        }

        console.log(`Rota de scraper chamada para o SKU: ${sku}`);

        const produtoData = await scrapeProduto(sku);

        if(!produtoData){
            return NextResponse.json(
                { error: 'Produto não encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(produtoData, { status: 200});

    }catch(error){
        console.error('Erro no scraper de produto:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar dados do produto' },
            { status: 500 }
        );
    }
}
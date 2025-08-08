import { NextRequest, NextResponse } from 'next/server';
import { returnInvalidDataErrors, validBody } from '@/utils';
import { deleteItem, updateItem } from '../../../../services/item';
import { patchItemSchema } from '../../../../schemas/item.schema';

export async function DELETE(request: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    const itemId = params.itemId;

    if (!itemId) {
      return NextResponse.json(
        { error: "ID do item não fornecido" },
        { status: 400 }
      );
    }

    const deletedItem = await deleteItem(itemId);

    if (!deletedItem) {
        return NextResponse.json(
            { error: "Item não encontrado" },
            { status: 404 }
        );
    }

    return NextResponse.json(
      { message: "Item deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao deletar item:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar item' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { itemId: string } } ) {
    try {
        const itemId = params.itemId;

        if (!itemId) {
            return NextResponse.json(
                { error: "ID do item não fornecido" },
                { status: 400 }
            );
        }

        const body = await validBody(request);
        const validationResult = patchItemSchema.safeParse(body);

        if (!validationResult.success) {
            return returnInvalidDataErrors(validationResult);
        }

        const validatedData = validationResult.data;

        const updatedItem = await updateItem(itemId, validatedData);
        return NextResponse.json(
            {
                message: "Item atualizado com sucesso",
                item: updatedItem
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao atualizar item:', error);
        return NextResponse.json(
            { error: 'Erro ao atualizar item' },
            { status: 500 }
        );
    }
}
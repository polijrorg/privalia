import { z } from 'zod';
import { nameSchema } from './base.schema';

export const createItemSchema = z.object({
    auditId: z.string().min(1, 'ID da auditoria é obrigatório'),
    ean: z.string(),
    resultado: z.enum(['OK', 'NOK']),
    divergencia: z.string(),
    imagem_divergente: z.string(),
})

export const patchItemSchema = createItemSchema.partial().refine((obj) => Object.keys(obj).length > 0, {
  message: "Pelo menos um campo precisa ser fornecido para atualização",
});
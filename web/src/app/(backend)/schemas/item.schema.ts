import { z } from 'zod';

export const createItemSchema = z.object({
    ean: z.string(),
    resultado: z.enum(['OK', 'NOK']),
    divergencia: z.string(),
    imagem_divergente: z.string(),
})

export const patchItemSchema = createItemSchema.partial().refine((obj) => Object.keys(obj).length > 0, {
  message: "Pelo menos um campo precisa ser fornecido para atualização",
});
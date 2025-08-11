import { z } from 'zod';
import { nameSchema } from './base.schema';

export const createAuditoriaSchema = z.object({
  name: nameSchema,
  categoria: z.string().min(2, 'Categoria obrigatória'),
  amostra: z.number(),
  total_pecas: z.number(),
  PO: z.string(),
  fornecedor: z.string(),
  status: z.string(),
  idExterno: z.string()
});

export const patchAuditoriaSchema = createAuditoriaSchema.partial().refine((obj) => Object.keys(obj).length > 0, {
  message: "Pelo menos um campo precisa ser fornecido para atualização",
});


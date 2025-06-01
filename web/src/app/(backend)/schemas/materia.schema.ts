import z from "zod";
import { slugSchema } from "./base.schema";

export const createMateriaSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
      invalid_type_error: "Nome deve ser um texto"
    })
    .min(1, "Nome não pode estar vazio")
    .max(100, "Nome não pode ter mais de 100 caracteres")
    .trim(),
  
  descricao: z
    .string({
      required_error: "Descrição é obrigatória",
      invalid_type_error: "Descrição deve ser um texto"
    })
    .min(1, "Descrição não pode estar vazia")
    .max(500, "Descrição não pode ter mais de 500 caracteres")
    .trim(),
  
  cor: z
    .string({
      required_error: "Cor é obrigatória",
      invalid_type_error: "Cor deve ser um texto"
    })
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Cor deve estar no formato hexadecimal válido (ex: #FF0000)")
    .trim(),
  
  slug: slugSchema
})
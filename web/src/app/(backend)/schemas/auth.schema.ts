import { z } from "zod";
import { emailSchema, nameSchema, passwordSchema } from "./base.schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços")
    .transform(str => str.trim()),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
})

export const updateUserSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
}).refine((data) => {
  // Pelo menos um campo deve ser fornecido
  return Object.keys(data).length > 0;
}, {
  message: "Pelo menos um campo deve ser fornecido para atualização",
});


export type LoginData = z.infer<typeof loginSchema>;

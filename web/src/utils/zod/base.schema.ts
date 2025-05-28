import { z } from "zod";

export const passwordSchema = z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/\d/, "Senha deve conter pelo menos um número");

export const emailSchema = z
    .string()
    .email("Email inválido")
    .transform(str => str.toLowerCase().trim());

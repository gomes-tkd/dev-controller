import { z } from "zod";

const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export const customerSchema = z.object({
    name: z.string().min(1, { message: "O campo nome é obrigatório" }),
    email: z
        .string()
        .email({ message: "Digite um email válido." })
        .min(1, { message: "O email é obrigatório." }),
    phone: z.string().refine((value) => phoneRegex.test(value), {
        message: "Número de telefone inválido.",
    }),
    address: z.string().min(1, { message: "Endereço é obrigatório" }),
});

export type CustomerData = z.infer<typeof customerSchema>;

export const ticketSchema = z.object({
    name: z.string().min(1, { message: "O nome do chamado é obrigatório" }),
    description: z
        .string()
        .min(1, { message: "A descrição do problema é obrigatória" }),
    customerId: z.string().min(1, { message: "Selecione um cliente" }),
    priority: z.enum(["BAIXA", "MEDIA", "ALTA"]),
});

export type TicketData = z.infer<typeof ticketSchema>;

export const ticketPublicSchema = z.object({
    email: z
        .string()
        .email({ message: "Digite um email válido" })
        .min(1, { message: "O email é obrigatório" }),
    name: z.string().min(1, { message: "O título do chamado é obrigatório" }),
    description: z.string().min(1, { message: "A descrição é obrigatória" }),
    priority: z.string().min(1, { message: "Selecione uma prioridade" }),
});

export type TicketPublicData = z.infer<typeof ticketPublicSchema>;

export const articleSchema = z.object({
    title: z.string().min(5, { message: "Título deve ter pelo menos 5 caracteres" }),
    content: z.string().min(20, { message: "Conteúdo muito curto" }),
    published: z.boolean().default(false)
});

export type ArticleData = z.infer<typeof articleSchema>;
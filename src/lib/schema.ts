import { z } from "zod";

const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

export const customerSchema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Digite um email válido.").min(1, "O email é obrigatório."),
    phone: z.string().refine((value) => phoneRegex.test(value), {
        message: "Número de telefone inválido."
    }),
    address: z.string().min(1, "Endereço é obrigatório"),
});

export type CustomerData = z.infer<typeof customerSchema>;

export const ticketSchema = z.object({
    name: z.string().min(1, "O nome do chamado é obrigatório"),
    description: z.string().min(1, "A descrição do problema é obrigatória"),
    customerId: z.string().min(1, "Selecione um cliente"),

});

export type TicketData = z.infer<typeof ticketSchema>;

export const ticketPublicSchema = z.object({
    email: z.string().email("Digite um email válido").min(1, "O email é obrigatório"),
    name: z.string().min(1, "O título do chamado é obrigatório"), // Nome do chamado
    description: z.string().min(1, "A descrição é obrigatória")
});

export type TicketPublicData = z.infer<typeof ticketPublicSchema>;
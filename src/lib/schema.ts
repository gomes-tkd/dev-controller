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
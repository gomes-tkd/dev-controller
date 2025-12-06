"use server";
import prismaClient from "@/lib/prisma";
import { ticketPublicSchema } from "@/lib/schema";
import { z } from "zod";

type TicketPublicData = z.infer<typeof ticketPublicSchema>;

export async function createPublicTicket(data: TicketPublicData) {
    const validation = ticketPublicSchema.safeParse(data);

    if(!validation.success) {
        return {
            error: "Dados inválidos. Verifique os campos."
        };
    }
    
    try {
        const customer = await prismaClient.customer.findFirst({
            where: {
                email: validation.data.email
            }
        });

        if(!customer) {
            return { error: "Cliente não encontrado com este email. Entre em contato com o suporte." };
        }

        await prismaClient.ticket.create({
            data: {
                name: validation.data.name,
                description: validation.data.description,
                status: "ABERTO",
                customerId: customer.id
            }
        });

        return {
            success: true
        };
    } catch (e) {
        return { error: "Erro interno ao processar solicitação." };
    }
}
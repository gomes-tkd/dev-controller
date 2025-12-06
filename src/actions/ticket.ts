"use server";

import { revalidatePath } from "next/cache";
import prismaClient from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/current-user";
import { ticketSchema } from "@/lib/schema";
import { z } from "zod";

type TicketData = z.infer<typeof ticketSchema>;

export async function createTicket(data: TicketData) {
    const user = await getAuthenticatedUser();

    if (!user) {
        return { error: "Usuário não autorizado." };
    }

    const validation = ticketSchema.safeParse(data);

    if (!validation.success) {
        return { error: "Dados inválidos. Verifique os campos." };
    }

    try {
        await prismaClient.ticket.create({
            data: {
                name: validation.data.name,
                description: validation.data.description,
                customerId: validation.data.customerId,
                status: "ABERTO",
            }
        });

        revalidatePath("/dashboard");

        return { success: true };

    } catch (e) {
        console.error(e);
        return { error: "Erro interno ao cadastrar chamado." };
    }
}

export async function updateTicket(id: string, data: TicketData) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Não autorizado" };

    const validation = ticketSchema.safeParse(data);
    if (!validation.success) return { error: "Dados inválidos" };

    try {
        const ticket = await prismaClient.ticket.findFirst({
            where: {
                id: id,
                customer: {
                    userId: user.id
                }
            }
        });

        if (!ticket) return { error: "Chamado não encontrado." };

        await prismaClient.ticket.update({
            where: { id },
            data: {
                name: validation.data.name,
                description: validation.data.description,
                priority: validation.data.priority,
                status: "ABERTO"
            }
        });

        revalidatePath("/dashboard");
        return { success: true };

    } catch (e) {
        return { error: "Erro ao atualizar chamado." };
    }
}
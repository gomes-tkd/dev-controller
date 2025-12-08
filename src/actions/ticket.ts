"use server";

import { revalidatePath } from "next/cache";
import prismaClient from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/current-user";
import { ticketSchema } from "@/lib/schema";
import { z } from "zod";
import emailService from "@/services/email-service";

type TicketData = z.infer<typeof ticketSchema>;

async function calculateDueDate(priority: string, userId: string): Promise<Date> {
    const date = new Date();

    const openTicketsCount = await prismaClient.ticket.count({
        where: {
            customer: { userId: userId },
            status: "ABERTO",
            priority: priority
        }
    });

    if (priority === "ALTA") {
        const capacityPerDay = 5;
        const extraDays = Math.floor(openTicketsCount / capacityPerDay);
        date.setDate(date.getDate() + 1 + extraDays);
    } else if (priority === "MEDIA") {
        const capacityPerDay = 10;
        const extraDays = Math.floor(openTicketsCount / capacityPerDay);
        date.setDate(date.getDate() + 2 + extraDays);
    } else {
        const capacityPerDay = 20;
        const extraDays = Math.floor(openTicketsCount / capacityPerDay);
        date.setDate(date.getDate() + 3 + extraDays);
    }

    return date;
}

export async function createTicket(data: TicketData) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Não autorizado" };

    const validation = ticketSchema.safeParse(data);
    if (!validation.success) return { error: "Dados inválidos" };

    try {
        const dueDate = await calculateDueDate(validation.data.priority, user.id);

        const ticket = await prismaClient.ticket.create({
            data: {
                name: validation.data.name,
                description: validation.data.description,
                priority: validation.data.priority,
                status: "ABERTO",
                customerId: validation.data.customerId,
                userId: user.id,
                dueDate: dueDate
            },
            include: { customer: true }
        });

        if (ticket.customer?.email) {
            await emailService.sendTicketCreated(ticket.customer.email, ticket.id, ticket.name);
        }

        revalidatePath("/dashboard");
        return { success: true };
    } catch (e) {
        return { error: "Erro ao criar chamado" };
    }
}

export async function updateTicket(id: string, data: TicketData) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Não autorizado" };

    const validation = ticketSchema.safeParse(data);
    if (!validation.success) return { error: "Dados inválidos" };

    try {
        const ticketCheck = await prismaClient.ticket.findFirst({
            where: { id, customer: { userId: user.id } }
        });

        if (!ticketCheck) return { error: "Chamado não encontrado" };

        await prismaClient.ticket.update({
            where: { id },
            data: {
                name: validation.data.name,
                description: validation.data.description,
                priority: validation.data.priority,
                customerId: validation.data.customerId
            }
        });

        revalidatePath(`/dashboard/ticket/${id}`);
        revalidatePath("/dashboard");
        return { success: true };
    } catch (e) {
        return { error: "Erro ao atualizar chamado" };
    }
}

export async function updateTicketStatus(id: string, newStatus: string) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Não autorizado" };

    try {
        const ticketCheck = await prismaClient.ticket.findFirst({
            where: { id, customer: { userId: user.id } },
            include: { customer: true }
        });

        if (!ticketCheck) return { error: "Permissão negada" };

        await prismaClient.ticket.update({
            where: { id },
            data: { status: newStatus }
        });

        if (ticketCheck.customer?.email) {
            await emailService.sendTicketStatusChanged(ticketCheck.customer.email, ticketCheck.id, ticketCheck.name, newStatus);
        }

        revalidatePath(`/dashboard/ticket/${id}`);
        revalidatePath("/dashboard");
        return { success: true };
    } catch (e) {
        return { error: "Erro ao atualizar status" };
    }
}
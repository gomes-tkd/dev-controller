"use server";

import { revalidatePath } from "next/cache";
import prismaClient from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/current-user";
import { customerSchema } from "@/lib/schema";
import { z } from "zod";

type CustomerData = z.infer<typeof customerSchema>;

export async function createCustomer(data: CustomerData) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Não autorizado" };

    const validation = customerSchema.safeParse(data);
    if (!validation.success) return { error: "Dados inválidos" };

    try {
        await prismaClient.customer.create({
            data: {
                ...validation.data,
                userId: user.id
            }
        });
        revalidatePath("/dashboard/customer");
        return { success: true };
    } catch (err) {
        return { error: "Erro ao cadastrar cliente" };
    }
}

export async function updateCustomer(id: string, data: CustomerData) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Não autorizado" };

    const validation = customerSchema.safeParse(data);
    if (!validation.success) return { error: "Dados inválidos" };

    try {
        const customer = await prismaClient.customer.findFirst({
            where: { id, userId: user.id }
        });

        if (!customer) return { error: "Cliente não encontrado ou não autorizado" };

        await prismaClient.customer.update({
            where: { id },
            data: {
                name: validation.data.name,
                email: validation.data.email,
                phone: validation.data.phone,
                address: validation.data.address
            }
        });

        revalidatePath("/dashboard/customer");
        return { success: true };
    } catch (err) {
        return { error: "Erro ao atualizar cliente" };
    }
}
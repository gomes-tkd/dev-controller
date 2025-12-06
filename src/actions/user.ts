"use server";

import { revalidatePath } from "next/cache";
import prismaClient from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/current-user";
import { z } from "zod";

const updateUserSchema = z.object({
    name: z.string().min(2, "O nome precisa ter pelo menos 2 caracteres"),
});

export async function updateUserProfile(data: z.infer<typeof updateUserSchema>) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Não autorizado" };

    const validation = updateUserSchema.safeParse(data);
    if (!validation.success) return { error: "Nome inválido" };

    try {
        await prismaClient.user.update({
            where: { id: user.id },
            data: { name: validation.data.name }
        });

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/profile");
        return { success: true };
    } catch (err) {
        return { error: "Erro ao atualizar perfil" };
    }
}

export async function deleteAccount() {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Não autorizado" };

    try {
        await prismaClient.user.delete({
            where: { id: user.id }
        });

        return { success: true };
    } catch (err) {
        return { error: "Erro ao deletar conta" };
    }
}
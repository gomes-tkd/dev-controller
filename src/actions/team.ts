"use server";

import prismaClient from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/current-user";
import { revalidatePath } from "next/cache";

export default async function createTeamAndJoin(teamName: string) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Não autorizado" };

    try {
        const team = await prismaClient.team.create({
            data: {
                name: teamName,
                users: {
                    connect: { id: user.id }
                }
            }
        });

        revalidatePath("/dashboard/settings");
        return { success: true, teamId: team.id };
    } catch (e) {
        return { error: "Erro ao criar equipe" };
    }
}
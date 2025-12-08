"use server";

import { revalidatePath } from "next/cache";
import prismaClient from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/current-user";
import { articleSchema, ArticleData } from "@/lib/schema";

export async function createArticle(data: ArticleData) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Não autorizado" };

    const validation = articleSchema.safeParse(data);
    if (!validation.success) return { error: "Dados inválidos" };

    const slug = validation.data.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

    try {
        await prismaClient.article.create({
            data: {
                title: validation.data.title,
                slug: slug,
                content: validation.data.content,
                published: validation.data.published,
                userId: user.id
            }
        });

        revalidatePath("/dashboard/help");
        return { success: true };
    } catch (e) {
        return { error: "Erro ao criar artigo. Slug duplicado?" };
    }
}

export async function deleteArticle(id: string) {
    const user = await getAuthenticatedUser();
    if (!user) return { error: "Não autorizado" };

    try {
        await prismaClient.article.delete({
            where: { id, userId: user.id }
        });

        revalidatePath("/dashboard/help");
        return { success: true };
    } catch (e) {
        return { error: "Erro ao deletar" };
    }
}
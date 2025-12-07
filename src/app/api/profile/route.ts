import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
    try {
        const currentUser = await getAuthenticatedUser();

        if (!currentUser) {
            return new NextResponse("Não autorizado", { status: 401 });
        }

        const body = await request.json();
        const { name } = body;

        if (!name || typeof name !== "string") {
            return new NextResponse("Nome inválido", { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name: name,
            },
        });

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.error("[PROFILE_PATCH_ERROR]", error);
        return new NextResponse("Erro interno do servidor", { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const currentUser = await getAuthenticatedUser();

        if (!currentUser) {
            return new NextResponse("Não autorizado", { status: 401 });
        }

        await prisma.$transaction([
            prisma.ticket.deleteMany({
                where: { userId: currentUser.id }
            }),
            prisma.customer.deleteMany({
                where: { userId: currentUser.id }
            }),
            prisma.user.delete({
                where: { id: currentUser.id }
            })
        ]);

        return new NextResponse(null, { status: 200 });

    } catch (error) {
        console.error("[PROFILE_DELETE_ERROR]", error);
        return new NextResponse("Erro ao deletar conta", { status: 500 });
    }
}
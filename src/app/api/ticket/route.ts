import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/current-user";
import prismaClient from "@/lib/prisma";

export async function PATCH(request: Request) {
    const user = await getAuthenticatedUser();

    if (!user) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id, status } = await request.json();

    if (!id || !status) {
        return NextResponse.json({ error: "ID e Status são obrigatórios" }, { status: 400 });
    }

    try {
        const ticketCheck = await prismaClient.ticket.findFirst({
            where: { id: id as string }
        });

        if (!ticketCheck) {
            return NextResponse.json({ error: "Chamado não encontrado" }, { status: 404 });
        }

        await prismaClient.ticket.update({
            where: { id: id as string },
            data: {
                status: status
            }
        });

        return NextResponse.json({ message: "Status atualizado!" }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Falha ao atualizar ticket" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const user = await getAuthenticatedUser();

    if (!user) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    try {
        const ticketCheck = await prismaClient.ticket.findFirst({
            where: {
                id: id as string,
                customer: {
                    userId: user.id
                }
            }
        });

        if (!ticketCheck) {
            return NextResponse.json({ error: "Ticket não encontrado ou não autorizado" }, { status: 404 });
        }

        await prismaClient.ticket.delete({
            where: { id: id as string }
        });

        return NextResponse.json({ message: "Ticket removido com sucesso!" }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Falha ao remover ticket" }, { status: 500 });
    }
}
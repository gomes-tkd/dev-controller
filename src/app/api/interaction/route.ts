import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import emailService from "@/services/email-service";

export async function POST(request: Request) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) return new NextResponse("Não autorizado", { status: 401 });

        const body = await request.json();
        const { ticketId, content } = body;

        if (!ticketId || !content) return new NextResponse("Dados inválidos", { status: 400 });

        const interaction = await prisma.interaction.create({
            data: {
                ticketId,
                content,
                userId: user.id
            },
            include: {
                User: { select: { name: true, image: true } },
                ticket: {
                    include: {
                        customer: true
                    }
                }
            }
        });

        if (interaction.ticket.customer?.email) {
            await emailService.sendNewInteraction(
                interaction.ticket.customer.email,
                ticketId,
                content
            );
        }

        return NextResponse.json(interaction);
    } catch (error) {
        return new NextResponse("Erro interno", { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) return new NextResponse("Não autorizado", { status: 401 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) return new NextResponse("ID obrigatório", { status: 400 });

        const interaction = await prisma.interaction.findUnique({
            where: { id }
        });

        if (!interaction) return new NextResponse("Não encontrado", { status: 404 });

        if (interaction.userId !== user.id) {
            return new NextResponse("Proibido: Você só pode deletar seus comentários", { status: 403 });
        }

        await prisma.interaction.delete({ where: { id } });

        return NextResponse.json({ message: "Deletado" });

    } catch (error) {
        return new NextResponse("Erro interno", { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const user = await getAuthenticatedUser();
        if (!user) return new NextResponse("Não autorizado", { status: 401 });

        const body = await request.json();
        const { id, content } = body;

        if (!id || !content) return new NextResponse("Dados inválidos", { status: 400 });

        const interaction = await prisma.interaction.findUnique({
            where: { id }
        });

        if (!interaction) return new NextResponse("Não encontrado", { status: 404 });

        if (interaction.userId !== user.id) {
            return new NextResponse("Proibido: Você só pode editar seus comentários", { status: 403 });
        }

        const updated = await prisma.interaction.update({
            where: { id },
            data: { content },
            include: {
                User: { select: { name: true, image: true } }
            }
        });

        return NextResponse.json(updated);

    } catch (error) {
        return new NextResponse("Erro interno", { status: 500 });
    }
}
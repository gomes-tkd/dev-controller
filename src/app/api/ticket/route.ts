import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
import emailService from "@/services/email-service";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, email, priority } = body;

        if (!name || !description || !email) {
            return new NextResponse("Dados incompletos", { status: 400 });
        }

        const customerFound = await prismaClient.customer.findFirst({
            where: { email: email }
        });

        if (!customerFound) {
            return NextResponse.json({ error: "Cliente não encontrado." }, { status: 404 });
        }

        const ticket = await prismaClient.ticket.create({
            data: {
                name,
                description,
                status: "ABERTO",
                priority: priority || "BAIXA",
                customerId: customerFound.id,
                userId: customerFound.userId
            }
        });

        await emailService.sendTicketCreated(email, ticket.id, ticket.name);

        return NextResponse.json(ticket);

    } catch (error) {
        return new NextResponse("Erro interno", { status: 500 });
    }
}
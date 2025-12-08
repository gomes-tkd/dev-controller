import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return new NextResponse("Email obrigatório", { status: 400 });
        }

        const customer = await prisma.customer.findFirst({
            where: {
                email: email
            },
            select: {
                id: true,
                name: true
            }
        });

        if (!customer) {
            return new NextResponse("Cliente não encontrado", { status: 404 });
        }

        return NextResponse.json(customer);

    } catch (error) {
        return new NextResponse("Erro interno", { status: 500 });
    }
}
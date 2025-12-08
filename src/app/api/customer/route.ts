import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";
import { customerSchema } from "@/lib/schema";
import { getAuthenticatedUser } from "@/lib/current-user";

export async function DELETE(request: Request) {
    const user = await getAuthenticatedUser();

    if (!user) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const customerId = searchParams.get("id");

        if (!customerId) {
            return NextResponse.json({ error: "ID do cliente não fornecido" }, { status: 400 });
        }

        await prismaClient.customer.delete({
            where: {
                id: customerId,
                userId: user.id
            }
        });

        return NextResponse.json({ message: "Cliente deletado com sucesso!" });

    } catch (error) {
        const err = error as Error;
        return NextResponse.json({ error: "Falha ao deletar cliente. Error: " +  err.message}, { status: 500 });
    }
}

export async function POST(request: Request) {
    const user = await getAuthenticatedUser();

    if (!user) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, email, phone, address } = customerSchema.parse(body);

        await prismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address: address || "",
                userId: user.id
            }
        });

        return NextResponse.json({ message: "Cliente cadastrado com sucesso!" });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Erro interno ao cadastrar." }, { status: 500 });
    }
}
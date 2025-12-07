import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return new NextResponse("Dados incompletos", { status: 400 });
        }

        const userExists = await prisma.user.findUnique({
            where: { email }
        });

        if (userExists) {
            return new NextResponse("Este e-mail já está cadastrado.", { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword);

    } catch (error) {
        return new NextResponse("Erro interno ao criar conta", { status: 500 });
    }
}
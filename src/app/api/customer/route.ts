import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
    }

    const { name, email, phone, address, userId } = await request.json();

    try {
        await prismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                userId
            }
        });

        return NextResponse.json({ message: "Customer created successfully!" });
    } catch (e) {
        const err = e as Error;

        return NextResponse.json({ error: "Failed create new customer - " + err.message }, { status: 400 });
    }
}
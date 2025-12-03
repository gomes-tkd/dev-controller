import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function getAuthenticatedUser() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return null;
    }

    const currentUser = await prismaClient.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    return currentUser;
}
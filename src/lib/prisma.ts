// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@/generated/prisma/client";

let prismaClient: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prismaClient = new PrismaClient();
} else {
    const globalWithPrisma = global as typeof globalThis & { prismaClient?: PrismaClient };

    if (!globalWithPrisma.prismaClient) {
        globalWithPrisma.prismaClient = new PrismaClient();
    }

    prismaClient = globalWithPrisma.prismaClient;
}

export default prismaClient;

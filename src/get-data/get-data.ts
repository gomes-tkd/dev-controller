import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getUserSession(): Promise<Session | null> {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            console.warn("[getUserSession] Nenhuma sessão ativa encontrada.");
            return null;
        }

        return session;
    }  catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : String(err);
        throw new Error("Failed to fetch data. Error: " + errMessage);
    }
}

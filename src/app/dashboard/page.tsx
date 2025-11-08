import React from "react";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import RedirectTimer from "@/components/utils/redirect-time";

async function getUserSession(): Promise<Session | null> {
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

export default async function DashboardPage() {
    const session: (Session | null) = await getUserSession();

    if (!session || !session.user) {
        return (
            <main className={"flex items-center flex-col justify-center min-h-[calc(100vh-80px)]"}>
                <h2 className={"font-medium text-2xl mb-2"}>Acesso Negado</h2>
                <h1 className={"font-bold text-3xl mb-8 text-red-600 md:text-4xl"}>
                    Você precisa estar logado para acessar o Dashboard
                </h1>
                <RedirectTimer />
            </main>
        );

    }

    return (
        <main className={"flex items-center flex-col justify-center min-h-[calc(100vh-80px)]"}>
            <h2 className={"font-medium text-2xl mb-2"}>Bem-vindo ao Dashboard</h2>
            <h1 className={"font-bold text-3xl mb-8 text-blue-600 md:text-4xl"}>
                Gerencie suas atividades aqui
            </h1>
        </main>
    );
}

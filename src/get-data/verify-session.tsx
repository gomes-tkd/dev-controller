import RedirectTimer from "@/components/utils/redirect-time";
import { Session } from "next-auth";
import React from "react";

export function verifySession(session: Session | null) {
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

    return null;
}

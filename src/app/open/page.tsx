"use client";

import { useState } from "react";
import TicketPublicForm from "@/components/ticket/open-ticket-public-form";
import SuccessMessage from "@/components/ticket/open-ticket-success-message";

export default function OpenTicketPage() {
    const [success, setSuccess] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-10">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-blue-600 mb-2">DEVControle</h1>
                <h2 className="text-xl font-semibold text-slate-800">Central de Suporte</h2>
                <p className="text-slate-500">
                    {success
                        ? "Solicitação enviada com sucesso!"
                        : "Informe seu email cadastrado para abrir um chamado."
                    }
                </p>
            </div>

            {success ? (
                <SuccessMessage onReset={() => setSuccess(false)} />
            ) : (
                <TicketPublicForm onSuccess={() => setSuccess(true)} />
            )}
        </div>
    );
}
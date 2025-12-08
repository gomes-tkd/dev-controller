"use client";

import { useState } from "react";
import { FiCheckCircle, FiLoader, FiEdit, FiRefreshCw } from "react-icons/fi";
import { toast } from "sonner";
import { updateTicket } from "@/actions/ticket";

interface TicketActionsProps {
    ticketId: string;
    status: string;
}

export default function TicketActions({ ticketId, status }: TicketActionsProps) {
    const [isLoading, setIsLoading] = useState(false);

    async function handleUpdateStatus(newStatus: string) {
        setIsLoading(true);

        const response = await updateTicket(ticketId, newStatus);

        if (response.error) {
            toast.error(response.error);
        } else {
            toast.success(`Chamado ${newStatus === "FECHADO" ? "encerrado" : "reaberto"} com sucesso.`);
        }

        setIsLoading(false);
    }

    return (
        <div className="space-y-3">
            <button
                className="cursor-pointer w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 border border-slate-200"
                onClick={() => toast.info("Edição em breve.")}
            >
                <FiEdit size={16} />
                Editar Dados
            </button>

            {status === "ABERTO" ? (
                <button
                    onClick={() => handleUpdateStatus("FECHADO")}
                    disabled={isLoading}
                    className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm shadow-green-600/20 disabled:opacity-50"
                >
                    {isLoading ? <FiLoader className="animate-spin" /> : <FiCheckCircle size={16} />}
                    Encerrar Chamado
                </button>
            ) : (
                <button
                    onClick={() => handleUpdateStatus("ABERTO")}
                    disabled={isLoading}
                    className="cursor-pointer w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isLoading ? <FiLoader className="animate-spin" /> : <FiRefreshCw size={16} />}
                    Reabrir Chamado
                </button>
            )}
        </div>
    );
}
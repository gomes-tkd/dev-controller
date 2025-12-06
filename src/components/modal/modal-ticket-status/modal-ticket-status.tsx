"use client";

import React from "react";
import { FiX } from "react-icons/fi";
import axiosApi from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ModalStatusProps {
    ticketId: string;
    customerName: string | undefined;
    currentStatus: string;
    onClose: () => void;
}

export default function ModalTicketStatus({ ticketId, customerName, currentStatus, onClose }: ModalStatusProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    async function handleUpdateStatus(newStatus: string) {
        try {
            setIsLoading(true);
            await axiosApi.patch("/api/ticket", {
                id: ticketId,
                status: newStatus,
            });

            toast.success("Status atualizado!");
            router.refresh();
            onClose();
        } catch (err) {
            toast.error("Erro ao atualizar status.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 cursor-default"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Atualizar Status</h3>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-slate-400 hover:text-slate-600"
                        type="button"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <p className="text-slate-500 text-sm mb-4">
                    Selecione o novo status para o chamado de <strong>{customerName}</strong>:
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => handleUpdateStatus("ABERTO")}
                        disabled={isLoading}
                        className="cursor-pointer w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors font-medium"
                    >
                        🟢 Aberto
                        {currentStatus === "ABERTO" && <span className="text-xs bg-emerald-100 px-2 py-1 rounded ml-2">Atual</span>}
                    </button>

                    <button
                        onClick={() => handleUpdateStatus("PENDENTE")}
                        disabled={isLoading}
                        className="cursor-pointer w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-colors font-medium"
                    >
                        🟡 Pendente
                        {currentStatus === "PENDENTE" && <span className="text-xs bg-amber-100 px-2 py-1 rounded ml-2">Atual</span>}
                    </button>

                    <button
                        onClick={() => handleUpdateStatus("FECHADO")}
                        disabled={isLoading}
                        className="cursor-pointer w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-700 transition-colors font-medium"
                    >
                        ⚫ Fechado
                        {currentStatus === "FECHADO" && <span className="text-xs bg-slate-200 px-2 py-1 rounded ml-2">Atual</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}
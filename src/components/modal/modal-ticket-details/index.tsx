"use client";

import { FiEdit2, FiX } from "react-icons/fi";
import TicketProps from "@/utils/ticket-type";
import Link from "next/link";

interface ModalTicketDetailsProps {
    ticket: TicketProps;
    onClose: () => void;
}

export default function ModalTicketDetails({ ticket, onClose }: ModalTicketDetailsProps) {

    const priorityColor = {
        BAIXA: "bg-blue-100 text-blue-800",
        MEDIA: "bg-amber-100 text-amber-800",
        ALTA: "bg-red-100 text-red-800"
    }[ticket.priority] || "bg-gray-100 text-gray-800";

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl animate-in fade-in zoom-in duration-200">

                {/* CABEÇALHO DO MODAL */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50 rounded-t-lg">
                    <h2 className="text-lg font-bold text-slate-800">
                        Detalhes do Chamado
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded hover:bg-slate-200 transition-colors text-slate-500"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Cliente</h3>
                            <p className="text-slate-900 font-bold text-xl">{ticket.customer}</p>
                        </div>

                        <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${priorityColor}`}>
                                {ticket.priority}
                            </span>
                            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded text-xs font-bold uppercase border border-slate-200">
                                {ticket.status}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Assunto</h3>
                        <p className="text-slate-800 font-medium text-lg">{ticket.name}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-md border border-slate-100">
                        <h3 className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wide">Descrição do Problema</h3>
                        <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                            {ticket.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-6 pt-2 border-t border-slate-100 mt-2">
                        <div>
                            <span className="text-xs text-slate-400 block">ID do Chamado</span>
                            <span className="text-xs text-slate-600 font-mono">{ticket.id}</span>
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 block">Data de Abertura</span>
                            <span className="text-xs text-slate-600">{ticket.date}</span>
                        </div>
                    </div>

                </div>

                <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded text-slate-600 hover:bg-slate-200 font-medium text-sm transition-colors"
                    >
                        Fechar
                    </button>

                    <Link
                        href={`/dashboard/ticket/${ticket.id}`}
                        className="bg-blue-600 flex items-center gap-2 px-4 py-2 rounded text-white hover:bg-blue-700 font-medium text-sm transition-colors shadow-sm"
                    >
                        <FiEdit2 size={16} />
                        Editar Chamado
                    </Link>
                </div>

            </div>
        </div>
    );
}
"use client";

import { FiX } from "react-icons/fi";
import TicketProps from "@/utils/ticket.type";

interface ModalDetailsProps {
    ticket: TicketProps;
    onClose: () => void;
}

export default function ModalTicketDetails({ ticket, onClose }: ModalDetailsProps) {
    return (
        <div
            className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 cursor-default"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800">Detalhes do Chamado</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <div className="space-y-3">
                    <div>
                        <h3 className="text-sm font-medium text-slate-500">Cliente</h3>
                        <p className="text-slate-900 font-medium text-lg">{ticket.customer}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-slate-500">Descrição</h3>
                        <p className="text-slate-700">{ticket.description}</p>
                    </div>
                    <div className="border-t pt-4 mt-2">
                        <p className="text-xs text-slate-400">ID: {ticket.id}</p>
                        <p className="text-xs text-slate-400">Data: {ticket.date}</p>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-slate-100 text-slate-700 font-bold py-2 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}
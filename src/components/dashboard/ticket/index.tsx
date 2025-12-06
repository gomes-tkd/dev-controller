"use client";

import { FiTrash2, FiCheckSquare } from "react-icons/fi";
import TicketProps from "@/utils/ticket.type";
import { toast } from "sonner";
import axiosApi from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ModalTicketStatus from "@/providers/modal-ticket-status";
import ModalTicketDetails from "@/providers/modal-ticket-details";

interface BadgeProps {
    label: string;
}

function TicketBadge({ label }: BadgeProps) {
    const styles: Record<string, string> = {
        ABERTO: "bg-emerald-100 text-emerald-700 border border-emerald-200",
        PENDENTE: "bg-amber-100 text-amber-700 border border-amber-200",
        FECHADO: "bg-slate-100 text-slate-700 border border-slate-200",
    };

    const currentStyle = styles[label] || "bg-gray-100 text-gray-700";

    return (
        <span className={`${currentStyle} px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase`}>
      {label}
    </span>
    );
}

export default function TicketItem({ ticket }: { ticket: TicketProps }) {
    const router = useRouter();
    const [openModalStatus, setOpenModalStatus] = useState(false);
    const [openModalDetails, setOpenModalDetails] = useState(false);

    function handleButtonClick(e: React.MouseEvent, action: () => void) {
        e.stopPropagation();
        action();
    }

    async function handleDelete() {
        try {
            await axiosApi.delete("/api/ticket", {
                params: { id: ticket.id }
            });
            toast.success("Chamado deletado!");
            router.refresh();
        } catch (err) {
            console.error(err);
            toast.error("Erro ao deletar.");
        }
    }

    return (
        <>
            <tr
                onClick={() => setOpenModalDetails(true)}
                className="cursor-pointer border-b border-slate-100 h-16 last:border-b-0 hover:bg-slate-50 transition-colors duration-200 group relative"
            >
                <td className="text-left pl-4">
                    <div className="font-medium text-slate-900">{ticket.customer}</div>
                    <div className="text-xs text-slate-400 sm:hidden mt-1">ID: {ticket.id}</div>
                </td>
                <td className="text-left hidden sm:table-cell text-slate-500 text-sm">
                    {ticket.date}
                </td>
                <td className="text-left">
                    <TicketBadge label={ticket.status} />
                </td>
                <td className="text-left">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => handleButtonClick(e, () => setOpenModalStatus(true))}
                            className="cursor-pointer p-2 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-600 transition-colors"
                            title="Alterar Status"
                        >
                            <FiCheckSquare size={18} />
                        </button>

                        <button
                            onClick={(e) => handleButtonClick(e, handleDelete)}
                            className="cursor-pointer p-2 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                            title="Excluir"
                        >
                            <FiTrash2 size={18} />
                        </button>
                    </div>

                    {openModalStatus && (
                        <ModalTicketStatus
                            ticketId={ticket.id}
                            customerName={ticket.customer}
                            currentStatus={ticket.status}
                            onClose={() => setOpenModalStatus(false)}
                        />
                    )}

                    {openModalDetails && (
                        <ModalTicketDetails
                            ticket={ticket}
                            onClose={() => setOpenModalDetails(false)}
                        />
                    )}

                </td>
            </tr>
        </>
    );
}
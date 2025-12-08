"use client";

import React from "react";
import { FiTrash2, FiCheckSquare, FiEdit, FiLoader } from "react-icons/fi";
import TicketProps from "@/utils/ticket-type";
import { toast } from "sonner";
import axiosApi from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

import ModalTicketStatus from "@/components/modal/modal-ticket-status";
import ModalTicketDetails from "@/components/modal/modal-ticket-details";
import SlaBadge from "@/components/ticket/ticket-sla-badge";

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
    const [isDeleting, setIsDeleting] = useState(false);

    function handleButtonClick(e: React.MouseEvent, action: () => void) {
        e.stopPropagation();
        if (isDeleting) return;
        action();
    }

    async function handleDelete() {
        try {
            setIsDeleting(true);
            await axiosApi.delete("/api/ticket", {
                params: { id: ticket.id }
            });
            toast.success("Chamado deletado!");
            router.refresh();
        } catch (err) {
            console.error(err);
            toast.error("Erro ao deletar.");
            setIsDeleting(false);
        }
    }

    const priorityColor = {
        BAIXA: "bg-blue-50 text-blue-700 border-blue-200",
        MEDIA: "bg-amber-50 text-amber-700 border-amber-200",
        ALTA: "bg-red-50 text-red-700 border-red-200"
    }[ticket.priority] || "bg-gray-50 text-gray-500 border-gray-200";

    return (
        <tr
            onClick={() => setOpenModalDetails(true)}
            className="cursor-pointer border-b border-slate-100 h-16 last:border-b-0 hover:bg-slate-50 transition-colors duration-200 group relative"
        >
            <td className="text-left px-4 py-3 w-48 align-middle">
                <div className="font-bold text-slate-900 truncate max-w-[180px]" title={ticket.customer}>
                    {ticket.customer}
                </div>
            </td>

            <td className="text-left px-4 py-3 align-middle">
                <div className="font-medium text-slate-700 truncate max-w-[200px] sm:max-w-xs" title={ticket.name}>
                    {ticket.name}
                </div>
                <div className="text-[10px] text-slate-400 sm:hidden">#{ticket.id.slice(0, 6)}</div>
            </td>

            <td className="text-left hidden sm:table-cell px-4 py-3 align-middle">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                        Aberto em {ticket.date}
                    </span>
                </div>
            </td>

            <td className="text-left hidden sm:table-cell px-4 py-3 align-middle">
                <div className="flex flex-col gap-1">
                    <SlaBadge dueDate={ticket.dueDate} status={ticket.status} />
                </div>
            </td>

            <td className="text-left hidden md:table-cell px-4 py-3 w-32 align-middle">
                <span className={`${priorityColor} px-2 py-1 rounded text-xs font-bold border uppercase inline-block text-center min-w-[70px]`}>
                    {ticket.priority}
                </span>
            </td>

            <td className="text-left px-4 py-3 w-32 align-middle">
                <button
                    className="cursor-pointer"
                    onClick={(e) => handleButtonClick(e, () => setOpenModalStatus(true))}
                >
                    <TicketBadge label={ticket.status} />
                </button>
            </td>

            <td className="text-right px-4 py-3 w-24 align-middle">
                <div className="flex items-center justify-end gap-2">
                    <button
                        disabled={isDeleting}
                        onClick={(e) => handleButtonClick(e, () => setOpenModalStatus(true))}
                        className="cursor-pointer p-2 rounded-full bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors disabled:opacity-50"
                        title="Alterar Status"
                    >
                        <FiCheckSquare size={16} />
                    </button>

                    <button
                        disabled={isDeleting}
                        onClick={(e) => handleButtonClick(e, () => router.push(`/dashboard/ticket/${ticket.id}`))}
                        className="cursor-pointer p-2 rounded-full bg-slate-50 hover:bg-blue-100 text-slate-500 hover:text-blue-600 transition-colors disabled:opacity-50"
                        title="Editar"
                    >
                        <FiEdit size={16} />
                    </button>

                    <button
                        disabled={isDeleting}
                        onClick={(e) => handleButtonClick(e, handleDelete)}
                        className="cursor-pointer p-2 rounded-full bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Excluir"
                    >
                        {isDeleting ? (
                            <FiLoader size={16} className="animate-spin text-red-600" />
                        ) : (
                            <FiTrash2 size={16} />
                        )}
                    </button>
                </div>

                <div onClick={(e) => e.stopPropagation()} className="cursor-default">
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
                </div>
            </td>
        </tr>
    );
}
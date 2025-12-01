"use client";

import { FiFile, FiTrash2 } from "react-icons/fi";

export interface TicketProps {
    id: string;
    customer: string;
    date: string;
    status: string;
}

interface BadgeProps {
    label: string;
}

const TicketBadge = ({ label }: BadgeProps) => {
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
};

export default function TicketItem({ ticket }: { ticket: TicketProps }) {
    return (
        <tr
            className={
                "border-b border-slate-100 h-16 last:border-b-0 " +
                "hover:bg-slate-50 transition-colors duration-200 group"
            }
        >
            <td className={"text-left pl-4"}>
                <div className={"font-medium text-slate-900"}>{ticket.customer}</div>
                <div className={"text-xs text-slate-400 sm:hidden mt-1"}>ID: {ticket.id}</div>
            </td>
            <td className={"text-left hidden sm:table-cell text-slate-500 text-sm"}>
                {ticket.date}
            </td>
            <td className={"text-left"}>
                <TicketBadge label={ticket.status} />
            </td>
            <td className={"text-left"}>
                <div
                    className={
                        "flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 " +
                        "transition-opacity duration-200 opacity-100"
                    }
                >
                    <button
                        className={
                            "cursor-pointer p-2 rounded-full hover:bg-blue-50 text-slate-400 " +
                            "hover:text-blue-600 transition-colors"
                        }
                        title={"Ver detalhes"}
                    >
                        <FiFile size={20} />
                    </button>
                    <button
                        className={
                            "cursor-pointer p-2 rounded-full hover:bg-red-50 text-slate-400 " +
                            "hover:text-red-600 transition-colors"
                        }
                        title={"Excluir"}
                    >
                        <FiTrash2 size={20} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
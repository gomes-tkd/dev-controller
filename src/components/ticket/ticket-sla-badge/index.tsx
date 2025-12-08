"use client";

import { FiClock, FiAlertTriangle } from "react-icons/fi";

export default function TicketSlaBadge({ dueDate, status }: { dueDate: Date | string | null, status: string }) {
    if (status === "FECHADO" || !dueDate) return null;

    const diff = new Date(dueDate).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return (
        <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
            <FiAlertTriangle /> VENCIDO
        </span>
    );

    return (
        <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border ${
            days <= 1 ? "text-amber-600 bg-amber-50 border-amber-100 animate-pulse" : "text-slate-500 bg-slate-50 border-slate-200"
        }`}>
            <FiClock /> {days === 0 ? "HOJE" : `${days}D`}
        </span>
    );
}
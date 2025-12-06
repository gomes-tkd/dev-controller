"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiAlertCircle } from "react-icons/fi"; // Ícone de alerta para prioridade

export default function FilterPriority() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPriority = searchParams.get("priority") || "";

    function handleFilter(priority: string) {
        const params = new URLSearchParams(searchParams);

        if (priority) {
            params.set("priority", priority);
        } else {
            params.delete("priority");
        }

        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
                <FiAlertCircle size={16} />
            </div>
            <select
                onChange={(e) => handleFilter(e.target.value)}
                value={currentPriority}
                className="h-10 pl-9 pr-4 rounded-md border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer min-w-[160px]"
            >
                <option value="">Todas Prioridades</option>
                <option value="BAIXA">🟢 Baixa</option>
                <option value="MEDIA">🟡 Média</option>
                <option value="ALTA">🔴 Alta</option>
            </select>
        </div>
    );
}
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FiFilter } from "react-icons/fi";

export default function FilterStatus() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentStatus = searchParams.get("status") || "";

    function handleFilter(status: string) {
        const params = new URLSearchParams(searchParams);

        if (status) {
            params.set("status", status);
        } else {
            params.delete("status");
        }

        // Sempre que filtrar, volta para a página 1 para não bugar a paginação
        params.set("page", "1");

        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">
                <FiFilter size={16} />
            </div>
            <select
                onChange={(e) => handleFilter(e.target.value)}
                value={currentStatus}
                className="h-10 pl-9 pr-4 rounded-md border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer min-w-[160px]"
            >
                <option value="">Todos os Status</option>
                <option value="ABERTO">🟢 Abertos</option>
                <option value="PENDENTE">🟡 Pendentes</option>
                <option value="FECHADO">⚪ Fechados</option>
            </select>
        </div>
    );
}
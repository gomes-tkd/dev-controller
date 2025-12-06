"use client";

import { FiSearch } from "react-icons/fi";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function HeaderSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }

        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="h-4 w-4 text-slate-400" />
            </div>
            <input
                type="text"
                className="block w-full rounded-md border border-slate-300 pl-10 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none transition-colors"
                placeholder="Buscar por nome, cliente..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('q')?.toString()}
            />
        </div>
    );
}
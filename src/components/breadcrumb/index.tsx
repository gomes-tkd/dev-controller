"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight, FiHome } from "react-icons/fi";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const pathname = usePathname();

    const breadcrumbItems = items && items.length > 0
        ? items
        : generateBreadcrumbsFromPath(pathname);

    function generateBreadcrumbsFromPath(path: string): BreadcrumbItem[] {
        if (path === "/") return [];

        const pathNames = path.split("/").filter((p) => p);

        return pathNames.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join("/")}`;
            const decodedLink = decodeURIComponent(link);
            const label = decodedLink.charAt(0).toUpperCase() + decodedLink.slice(1);

            const isLast = index === pathNames.length - 1;

            return {
                label,
                href: isLast ? undefined : href
            };
        });
    }

    if (!breadcrumbItems.length && pathname === "/") {
        return null;
    }

    return (
        <nav aria-label="Breadcrumb" className="flex items-center text-sm text-slate-500 mb-6">
            <Link
                href="/dashboard"
                className="hover:text-blue-600 transition-colors flex items-center gap-1 group"
                title="Ir para o início"
            >
                <FiHome size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="hidden sm:inline font-medium">Home</span>
            </Link>

            {breadcrumbItems.map((item, index) => (
                <div key={index} className="flex items-center">
                    <FiChevronRight size={14} className="mx-2 text-slate-400" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-blue-600 transition-colors font-medium"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-slate-800 font-bold pointer-events-none">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
}
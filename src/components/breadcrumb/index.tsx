"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";

export default function Breadcrumb() {
    const pathname = usePathname();

    if (pathname === "/") {
        return null;
    }

    const pathNames = pathname.split("/").filter((path) => path);

    return (
        <nav aria-label={"Breadcrumb"} className={"flex items-center text-sm text-slate-500"}>
            <Link
                href={"/dashboard"}
                className={"hover:text-blue-600 transition-colors flex items-center gap-1 group"}
                title={"Ir para o início"}
            >
                <FiHome size={16} className={"text-slate-400 group-hover:text-blue-600 transition-colors"} />
                <span className={"hidden sm:inline font-medium"}>Home</span>
            </Link>

            {pathNames.map((link, index) => {
                const href = `/${pathNames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathNames.length - 1;
                const decodedLink = decodeURIComponent(link);
                const formatName = decodedLink.charAt(0).toUpperCase() + decodedLink.slice(1);

                return (
                    <div key={href} className={"flex items-center"}>
                        <FiChevronRight className={"mx-2 text-slate-300"} size={16} />

                        {isLast ? (
                            <span
                                className={"font-semibold text-slate-800 cursor-default"}
                                aria-current={"page"}
                            >
                                {formatName}
                            </span>
                        ) : (
                            <Link
                                href={href}
                                className={"hover:text-blue-600 transition-colors font-medium"}
                            >
                                {formatName}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
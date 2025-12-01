import React from "react";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white border-t border-slate-200 mt-10 py-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Lado Esquerdo: Marca e Copyright */}
                <p className="text-sm text-slate-500 text-center md:text-left">
                    <span className="text-slate-900 font-bold">Dev</span>
                    <span className="text-blue-600 font-bold">Controle</span>
                    <span className="mx-2 text-slate-300">|</span>
                    &copy; {currentYear}
                </p>

                {/* Lado Direito: Links Úteis (Essenciais para parecer um SaaS real) */}
                <div className="flex items-center gap-6">
                    <Link
                        href="#"
                        className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200"
                    >
                        Termos
                    </Link>
                    <Link
                        href="#"
                        className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200"
                    >
                        Privacidade
                    </Link>
                    <Link
                        href="#"
                        className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200"
                    >
                        Suporte
                    </Link>
                </div>
            </div>
        </footer>
    );
}
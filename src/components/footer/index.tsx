import React from "react";

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-slate-200 py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">

                <p className="text-sm text-slate-500 text-center md:text-left">
                    <span className="text-slate-900 font-bold">Dev</span>
                    <span className="text-blue-600 font-bold">Controle</span>
                    <span className="mx-2 text-slate-300">|</span>
                    &copy; {new Date().getFullYear()}
                </p>

                <div className="flex items-center gap-6">
                    <button className="text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-pointer">
                        Termos
                    </button>
                    <button className="text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-pointer">
                        Privacidade
                    </button>
                    <button className="text-sm text-slate-500 hover:text-blue-600 transition-colors cursor-pointer">
                        Suporte
                    </button>
                </div>

            </div>
        </footer>
    );
}
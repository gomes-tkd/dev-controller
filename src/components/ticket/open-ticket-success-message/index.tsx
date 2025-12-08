"use client";

import { FiCheck, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

interface SuccessMessageProps {
    onReset: () => void;
}

export default function SuccessMessage({ onReset }: SuccessMessageProps) {
    return (
        <div className="w-full max-w-xl bg-white p-8 sm:p-12 rounded-lg border border-slate-200 shadow-lg text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheck size={40} className="text-green-600" />
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-2">Chamado Aberto!</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
                Nossa equipe técnica já recebeu sua solicitação e entrará em contato em breve através do email informado.
            </p>

            <div className="flex flex-col gap-3">
                <button
                    onClick={onReset}
                    className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                    Abrir novo chamado
                </button>

                <Link
                    href="/"
                    className="cursor-pointer w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                    <FiArrowLeft size={18} />
                    Voltar para Home
                </Link>
            </div>
        </div>
    );
}
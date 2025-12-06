"use client";

import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

interface SuccessMessageProps {
    onReset: () => void;
}

export default function SuccessMessage({ onReset }: SuccessMessageProps) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-4">
                <FiCheckCircle size={48} className="text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Chamado Aberto!</h1>
            <p className="text-slate-500 mb-6">
                Recebemos sua solicitação. Nossa equipe entrará em contato em breve através do email informado.
            </p>

            <button
                onClick={onReset}
                className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
                Abrir outro chamado
            </button>

            <div className="mt-4 pt-4 border-t">
                <Link href="/" className="text-sm text-slate-400 hover:text-slate-600">
                    Voltar para o site
                </Link>
            </div>
        </div>
    );
}
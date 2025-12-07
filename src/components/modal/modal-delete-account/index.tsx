"use client";

import { useState } from "react";
import axiosApi from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiAlertTriangle, FiLoader, FiX } from "react-icons/fi";
import { signOut } from "next-auth/react";

interface ModalDeleteAccountProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalDeleteAccount({ isOpen, onClose }: ModalDeleteAccountProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [confirmation, setConfirmation] = useState("");
    const CONFIRMATION_TEXT = "deletar conta";

    if (!isOpen) return null;

    async function handleDeleteAccount() {
        if (confirmation.toLowerCase() !== CONFIRMATION_TEXT) return;

        try {
            setIsLoading(true);
            await axiosApi.delete("/api/profile");

            toast.success("Conta encerrada com sucesso.");
            await signOut({ redirect: false });
            router.replace("/");

        } catch (err) {
            console.error(err);
            toast.error("Erro ao deletar conta. Tente novamente.");
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                <div className="bg-red-50 p-4 border-b border-red-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-full text-red-600">
                            <FiAlertTriangle size={24} />
                        </div>
                        <h2 className="text-lg font-bold text-red-900">Excluir Conta</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <FiX size={24} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Esta ação é <span className="font-bold text-red-600">irreversível</span>.
                        Todos os seus dados, clientes e chamados serão apagados permanentemente dos nossos servidores.
                    </p>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                            Digite <span className="text-red-600">"{CONFIRMATION_TEXT}"</span> para confirmar
                        </label>
                        <input
                            type="text"
                            value={confirmation}
                            onChange={(e) => setConfirmation(e.target.value)}
                            className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                            placeholder={CONFIRMATION_TEXT}
                        />
                    </div>
                </div>

                <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-slate-700 font-medium hover:bg-slate-200 rounded-md transition-colors text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        disabled={confirmation.toLowerCase() !== CONFIRMATION_TEXT || isLoading}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading && <FiLoader className="animate-spin" />}
                        Excluir Permanentemente
                    </button>
                </div>
            </div>
        </div>
    );
}
"use client";

import { useState } from "react";
import { toast } from "sonner";
import axiosApi from "@/lib/api";
import { useRouter } from "next/navigation";
import { FiSave, FiLoader, FiAlertCircle } from "react-icons/fi";

interface ProfileFormProps {
    defaultName: string;
    email: string;
}

export default function ProfileForm({ defaultName, email }: ProfileFormProps) {
    const router = useRouter();
    const [name, setName] = useState(defaultName);
    const [isLoading, setIsLoading] = useState(false);

    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault();

        if (name === defaultName) return;

        try {
            setIsLoading(true);

            await axiosApi.patch("/api/profile", {
                name: name,
            });

            toast.success("Perfil atualizado com sucesso!");
            router.refresh();
        } catch (err) {
            console.error(err);
            toast.error("Falha ao atualizar perfil.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                    Nome de Exibição
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800 font-medium"
                    placeholder="Como você quer ser chamado"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                    E-mail (Gerenciado pelo Google)
                </label>
                <div className="relative">
                    <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full px-4 py-2 border border-slate-200 bg-slate-100 rounded-md text-slate-500 cursor-not-allowed select-none"
                    />
                    <div className="absolute right-3 top-2.5 text-slate-400">
                        <FiAlertCircle size={18} />
                    </div>
                </div>
                <span className="text-xs text-slate-400 mt-1 block ml-1">
                    Para alterar o e-mail, é necessário alterar sua conta Google.
                </span>
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isLoading || name === defaultName}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto shadow-sm hover:shadow"
                >
                    {isLoading ? (
                        <>
                            <FiLoader className="animate-spin" size={20} />
                            Salvando...
                        </>
                    ) : (
                        <>
                            <FiSave size={20} />
                            Salvar Alterações
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
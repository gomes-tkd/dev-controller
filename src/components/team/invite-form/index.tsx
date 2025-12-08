"use client";

import { useState } from "react";
import { FiMail, FiLoader, FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import inviteMember from "@/actions/team";
import { useRouter } from "next/navigation";

export default function InviteForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleInvite(e: React.FormEvent) {
        e.preventDefault();

        if (!email) return;

        try {
            setIsLoading(true);
            const response = await inviteMember(email);

            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success("Convite enviado com sucesso!");
                setEmail("");
                router.refresh();
            }
        } catch (error) {
            toast.error("Ocorreu um erro ao enviar o convite.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleInvite} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    E-mail do novo membro
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                        <FiMail className="absolute left-3 top-3 text-slate-400" />
                        <input
                            type="email"
                            required
                            placeholder="exemplo@email.com"
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !email}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <FiLoader className="animate-spin" /> : <FiPlus />}
                        Convidar
                    </button>
                </div>
            </div>
        </form>
    );
}
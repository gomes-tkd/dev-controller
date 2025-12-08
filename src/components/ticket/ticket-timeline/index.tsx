"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiSend, FiLoader, FiUser, FiTrash2 } from "react-icons/fi";
import axiosApi from "@/lib/api";
import InteractionProps from "@/utils/interaction-type";
import TicketTimelineProps from "@/utils/ticket-timeline-type";
import { toast } from "sonner";

export default function TicketTimeline({ ticketId, currentUserId, initialInteractions }: TicketTimelineProps) {
    const router = useRouter();
    const [interactions, setInteractions] = React.useState<InteractionProps[]>(initialInteractions);
    const [message, setMessage] = React.useState("");
    const [isLoading, setIsLoading] = React. useState(false);

    async function handleSendMessage(e: React.FormEvent) {
        e.preventDefault();
        if (!message.trim()) return;

        setIsLoading(true);

        try {
            const response = await axiosApi.post("/api/interaction", {
                ticketId,
                content: message
            });

            setInteractions((prev) => [...prev, response.data]);
            setMessage("");
            router.refresh();
            toast.success("Comentário adicionado.");
        } catch (error) {
            toast.error("Erro ao enviar mensagem.");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if(!confirm("Excluir comentário?")) return;

        try {
            await axiosApi.delete(`/api/interaction?id=${id}`);
            setInteractions(prev => prev.filter(item => item.id !== id));
            toast.success("Comentário removido.");
            router.refresh();
        } catch (error) {
            toast.error("Erro ao remover.");
        }
    }

    return (
        <div className="space-y-6">
            <h3 className="font-bold text-slate-800 text-lg">Histórico</h3>

            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {interactions.length === 0 && (
                    <div className="text-center py-6 bg-slate-50 rounded border border-dashed border-slate-200">
                        <p className="text-slate-500 text-sm">Nenhuma interação registrada.</p>
                    </div>
                )}

                {interactions.map((item) => {
                    const isOwner = currentUserId === item.userId;

                    return (
                        <div key={item.id} className={`flex gap-4 ${isOwner ? "flex-row-reverse" : ""}`}>
                            <div className="flex-shrink-0">
                                {item.User?.image ? (
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                                        <Image
                                            src={item.User.image}
                                            alt={item.User.name || "Avatar"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                                        <FiUser size={20} />
                                    </div>
                                )}
                            </div>

                            <div className={`flex-1 p-4 rounded-lg border shadow-sm relative group ${isOwner ? "bg-blue-50 border-blue-100 rounded-tr-none" : "bg-white border-slate-200 rounded-tl-none"}`}>
                                <div className={`flex items-center justify-between mb-2 ${isOwner ? "flex-row-reverse" : ""}`}>
                                    <span className="font-bold text-slate-700 text-sm">
                                        {item.User?.name || "Sistema"}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-400">
                                            {new Date(item.createdAt).toLocaleString('pt-BR')}
                                        </span>
                                        {isOwner && (
                                            <button onClick={() => handleDelete(item.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-600 text-slate-400 transition-opacity">
                                                <FiTrash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <form onSubmit={handleSendMessage} className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm flex gap-4 items-start mt-4">
                <textarea
                    className="w-full resize-none bg-transparent outline-none text-slate-700 text-sm min-h-[60px]"
                    placeholder="Digite uma resposta..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={isLoading || !message.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? <FiLoader className="animate-spin" /> : <FiSend />}
                </button>
            </form>
        </div>
    );
}
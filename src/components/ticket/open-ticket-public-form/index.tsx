"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiSearch, FiUser, FiX, FiCheckCircle, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import axiosApi from "@/lib/api";
import axios from "axios";
import { ticketPublicSchema, TicketPublicData } from "@/lib/schema";

interface TicketPublicFormProps {
    onSuccess: () => void;
}

export default function TicketPublicForm({ onSuccess }: TicketPublicFormProps) {
    const [step, setStep] = useState(1);
    const [isLoadingClient, setIsLoadingClient] = useState(false);
    const [customer, setCustomer] = useState<{ id: string; name: string } | null>(null);

    const { register, handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm<TicketPublicData>({
        resolver: zodResolver(ticketPublicSchema),
        defaultValues: {
            priority: "BAIXA"
        }
    });

    async function handleCheckEmail() {
        const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;

        const isValid = await trigger("email");
        if (!isValid) return;

        setIsLoadingClient(true);

        try {
            const response = await axiosApi.post("/api/customer/check", {
                email: emailInput.value
            });

            setCustomer(response.data);
            setStep(2);
            toast.success(`Cliente ${response.data.name} identificado!`);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                toast.error("Ops! Cliente não encontrado na nossa base.");
            } else {
                toast.error("Erro ao buscar cliente.");
            }
        } finally {
            setIsLoadingClient(false);
        }
    }

    async function handleOpenTicket(data: TicketPublicData) {
        try {
            await axiosApi.post("/api/ticket", {
                name: data.name,
                description: data.description,
                email: data.email,
                priority: data.priority
            });

            onSuccess();

        } catch (error) {
            console.error(error);
            toast.error("Erro ao abrir chamado. Tente novamente.");
        }
    }

    return (
        <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-lg relative">

            {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                        <div>
                            <label className="font-bold text-slate-700 block mb-1">Seu E-mail</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Digite o email cadastrado..."
                                    className="w-full pl-4 pr-12 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    {...register("email")}
                                />
                                <FiSearch size={20} className="absolute right-4 top-3.5 text-slate-400" />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <button
                            type="button"
                            onClick={handleCheckEmail}
                            disabled={isLoadingClient}
                            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
                        >
                            {isLoadingClient ? <FiLoader className="animate-spin" /> : "Procurar Cadastro"}
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && customer && (
                <form onSubmit={handleSubmit(handleOpenTicket)} className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-4">

                    <div className="flex items-center justify-between mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full text-blue-600">
                                <FiUser size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-blue-600 font-bold uppercase">Cliente Identificado</p>
                                <p className="font-bold text-slate-800">{customer.name}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="cursor-pointer text-slate-400 hover:text-slate-600 p-2 hover:bg-blue-100 rounded-full transition-colors"
                            title="Trocar cliente"
                        >
                            <FiX size={20} />
                        </button>
                    </div>

                    <div>
                        <label className="font-bold text-slate-700 block mb-1">Assunto</label>
                        <input
                            type="text"
                            placeholder="Ex: Computador não liga..."
                            className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("name")}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="font-bold text-slate-700 block mb-1">Prioridade</label>
                        <select
                            className="cursor-pointer w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            {...register("priority")}
                        >
                            <option value="BAIXA">Baixa</option>
                            <option value="MEDIA">Média</option>
                            <option value="ALTA">Alta</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-bold text-slate-700 block mb-1">Descrição do Problema</label>
                        <textarea
                            placeholder="Descreva detalhadamente o que está acontecendo..."
                            className="w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                            {...register("description")}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <FiLoader className="animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                <FiCheckCircle size={20} />
                                Abrir Chamado
                            </>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketPublicSchema, TicketPublicData } from "@/lib/schema";
import Input from "@/components/input";
import { createPublicTicket } from "@/actions/public-ticket";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import Link from "next/link";

interface PublicFormProps {
    onSuccess: () => void;
}

export default function TicketPublicForm({ onSuccess }: PublicFormProps) {
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<TicketPublicData>({
        resolver: zodResolver(ticketPublicSchema)
    });

    async function handleRegisterTicket(data: TicketPublicData) {
        setServerError("");

        const result = await createPublicTicket(data);

        if (result.error) {
            setServerError(result.error);
            return;
        }

        reset();
        onSuccess();
    }

    return (
        <form
            className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-slate-100 w-full max-w-lg animate-in slide-in-from-bottom-4 duration-500"
            onSubmit={handleSubmit(handleRegisterTicket)}
        >
            {serverError && (
                <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-medium border border-red-100">
                    {serverError}
                </div>
            )}

            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-slate-700">Seu Email</label>
                <Input<TicketPublicData>
                    register={register}
                    type="email"
                    placeholder="Digite seu email de cadastro..."
                    name="email"
                    error={errors.email?.message}
                />
                <p className="text-xs text-slate-400 mt-1">
                    * O ticket será vinculado a este email.
                </p>
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-slate-700">Assunto</label>
                <Input<TicketPublicData>
                    register={register}
                    type="text"
                    placeholder="Ex: Problema na emissão de nota"
                    name="name"
                    error={errors.name?.message}
                />
            </div>

            <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-slate-700">Descrição do Problema</label>
                <textarea
                    className={`w-full border rounded-md h-32 px-4 py-3 bg-slate-50 resize-none transition-all outline-none 
                    ${errors.description
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-300 focus:border-blue-500"
                    }`}
                    placeholder="Descreva detalhadamente o que está acontecendo..."
                    {...register("description")}
                ></textarea>
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1 font-medium">{errors.description.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`
                    w-full flex items-center justify-center gap-2 h-12 rounded-md text-white font-bold transition-all text-lg cursor-pointer
                    ${isSubmitting ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"}
                `}
            >
                {isSubmitting ? <><FiLoader size={24} className="animate-spin" /> Processando...</> : "Enviar Solicitação"}
            </button>

            <div className="mt-6 text-center">
                <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                    Voltar para a Home
                </Link>
            </div>
        </form>
    );
}
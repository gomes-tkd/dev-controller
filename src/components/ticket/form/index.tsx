"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema, TicketData } from "@/lib/schema";
import Input from "@/components/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";
import { createTicket } from "@/actions/ticket";

interface TicketFormProps {
    customers: {
        id: string;
        name: string;
    }[];
}

export default function TicketForm({ customers }: TicketFormProps) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<TicketData>({
        resolver: zodResolver(ticketSchema)
    });

    async function handleRegisterTicket(data: TicketData) {
        const result = await createTicket(data);

        if (result.error) {
            toast.error(result.error);
            return;
        }

        toast.success("Chamado aberto com sucesso!");
        router.refresh();
        router.replace("/dashboard"); // Redireciona
    }

    return (
        <form
            className="flex flex-col mt-6 bg-white p-6 rounded-lg border border-slate-100 shadow-sm"
            onSubmit={handleSubmit(handleRegisterTicket)}
        >
            <label className="block mb-2 text-sm font-medium text-slate-700">Nome do chamado</label>
            <Input<TicketData>
                register={register}
                type="text"
                placeholder="Digite o nome do chamado"
                name="name"
                error={errors.name?.message}
            />

            <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-slate-700">Descreva o problema</label>
                <textarea
                    className={`w-full border rounded-md h-24 px-4 py-2 bg-white resize-none transition-all outline-none 
            ${errors.description
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                    placeholder="Descreva o problema em detalhes..."
                    {...register("description")}
                ></textarea>
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1 font-medium">{errors.description.message}</p>
                )}
            </div>

            <div className="mt-4 mb-2">
                <label className="block mb-2 text-sm font-medium text-slate-700">Selecione o cliente</label>
                <select
                    className={`w-full border rounded-md h-11 px-4 bg-white transition-all outline-none cursor-pointer
            ${errors.customerId
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                    defaultValue=""
                    {...register("customerId")}
                >
                    <option value="" disabled>Selecione um cliente...</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
                {errors.customerId && (
                    <p className="text-red-500 text-sm mt-1 font-medium">{errors.customerId.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`
                    cursor-pointer flex items-center justify-center gap-2 h-11 rounded-md text-white font-bold transition-all mt-6
                    ${isSubmitting ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"
                }
        `}
            >
                {isSubmitting ? <><FiLoader size={20} className="animate-spin" /> Salvando...</> : "Cadastrar Chamado"}
            </button>

        </form>
    );
}
"use client";
import React from "react";
import CustomerProps from "@/utils/customer.type";
import apiAxios from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";

export default function Card({ customer }: { customer: CustomerProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    async function handleDeleteCustomer() {
        try {
            setIsLoading(true);

            await apiAxios.delete("/api/customer", {
                params: {
                    id: customer.id
                }
            });

            toast.success("Cliente deletado com sucesso!");
            router.refresh();
        } catch (e) {
            console.error(e);
            toast.error("Erro ao deletar cliente. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <article
            className={
                "flex flex-col justify-between bg-white border " +
                "border-slate-200 shadow-sm rounded-xl p-5 hover:shadow-md " +
                "hover:border-blue-300 transition-all duration-300"
            }
        >
            <div>
                <div className={"flex justify-between items-start mb-4"}>
                    <h2 className={"font-bold text-lg text-slate-800 truncate pr-2"}>{customer.name}</h2>
                    <div
                        className={
                            "w-9 h-9 shrink-0 rounded-full bg-blue-100 flex items-center " +
                            "justify-center text-blue-600 text-xs font-bold border border-blue-200"
                        }
                    >
                        {customer.name.substring(0, 2).toUpperCase()}
                    </div>
                </div>

                <div className={"space-y-2 mb-4"}>
                    <p className={"text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center gap-1"}>
                        <span className={"text-xs uppercase font-bold text-slate-400 w-16"}>Email:</span>
                        <span className={"truncate"}>{customer.email}</span>
                    </p>
                    <p className={"text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center gap-1"}>
                        <span className={"text-xs uppercase font-bold text-slate-400 w-16"}>Fone:</span>
                        <span>{customer.phone}</span>
                    </p>
                </div>
            </div>

            <button
                onClick={handleDeleteCustomer}
                disabled={isLoading}
                className={`cursor-pointer w-full py-2 text-sm font-medium border rounded transition-colors flex items-center justify-center gap-2
                    ${isLoading
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "text-red-600 bg-red-50 border-transparent hover:bg-red-100 hover:border-red-200"
                }
                `}
            >
                {isLoading ? (
                    <>
                        <FiLoader className="animate-spin" size={16} />
                        Excluindo...
                    </>
                ) : (
                    "Excluir"
                )}
            </button>
        </article>
    );
}
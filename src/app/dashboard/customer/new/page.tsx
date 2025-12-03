import React from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import NewCustomerForm from "@/components/form";
import { FiArrowLeft } from "react-icons/fi";
import {getAuthenticatedUser} from "@/lib/current-user";

export default async function NewCustomerPage() {
    const user = await getAuthenticatedUser();

    if (!user) {
        return {error: "Não autorizado"};
    }

    return (
        <Container>
            <main className={"flex flex-col mt-9 mb-2 max-w-3xl mx-auto"}>
                <div className={"flex items-center gap-4 mb-4"}>
                    <Link
                        href={"/dashboard/customer"}
                        className={
                            "flex items-center gap-2 text-slate-500 hover:text-blue-600 " +
                            "transition-colors text-sm font-medium"
                        }
                    >
                        <FiArrowLeft size={16} />
                        Voltar para clientes
                    </Link>
                </div>

                <div className={"flex items-center justify-between mb-2"}>
                    <h1 className={"text-3xl font-bold tracking-tight text-slate-900"}>
                        Novo Cliente
                    </h1>
                </div>

                <p className={"text-slate-500 text-sm mb-6"}>
                    Preencha os dados abaixo para cadastrar um novo cliente no sistema.
                </p>

                <NewCustomerForm userId={user.id}/>
            </main>
        </Container>
    );
}
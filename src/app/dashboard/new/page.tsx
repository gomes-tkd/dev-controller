import Container from "@/components/ui/container";
import Link from 'next/link';
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/current-user";
import TicketForm from "@/components/ticket/form";
import { FiArrowLeft } from "react-icons/fi";

export default async function NewTicket() {
    const user = await getAuthenticatedUser();

    if (!user) {
        redirect("/");
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: user.id
        },
        select: {
            id: true,
            name: true
        }
    });

    return (
        <Container>
            <main className="flex flex-col mt-9 mb-2 max-w-3xl mx-auto">

                <div className="flex items-center gap-4 mb-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                        <FiArrowLeft size={16} />
                        Voltar para chamados
                    </Link>
                </div>

                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Novo Chamado
                    </h1>
                </div>

                <p className="text-slate-500 text-sm mb-6">
                    Preencha os campos para abrir um novo chamado de atendimento.
                </p>

                <TicketForm customers={customers} />

            </main>
        </Container>
    )
}
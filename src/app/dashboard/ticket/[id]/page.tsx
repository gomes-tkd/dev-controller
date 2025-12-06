import { getAuthenticatedUser } from "@/lib/current-user";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import TicketForm from "@/components/ticket/form";
import Container from "@/components/ui/container";
import Link from "next/link";

interface EditTicketProps {
    params: Promise<{ id: string }>;
}

export default async function EditTicketPage({ params }: EditTicketProps) {
    const user = await getAuthenticatedUser();
    if (!user) redirect("/");

    const { id } = await params;

    const ticket = await prismaClient.ticket.findFirst({
        where: {
            id: id,
            customer: { userId: user.id }
        }
    });

    if (!ticket) redirect("/dashboard");

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: user.id
        },
        select: { id: true, name: true }
    });

    return (
        <Container>
            <main className="mb-2 mt-9">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href="/dashboard"
                        className="bg-slate-200 px-4 py-2 rounded text-slate-700 hover:bg-slate-300 transition-colors text-sm font-medium"
                    >
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Editar Chamado</h1>
                </div>

                <TicketForm
                    customers={customers}
                    ticket={{
                        id: ticket.id,
                        name: ticket.name,
                        description: ticket.description,
                        priority: ticket.priority as "BAIXA" | "MEDIA" | "ALTA",
                        customerId: ticket.customerId
                    }}
                />
            </main>
        </Container>
    )
}
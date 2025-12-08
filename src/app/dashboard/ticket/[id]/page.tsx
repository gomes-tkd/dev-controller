import { getAuthenticatedUser } from "@/lib/current-user";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import Container from "@/components/ui/container";
import TicketTimeline from "@/components/ticket/ticket-timeline";
import TicketActions from "@/components/ticket/ticket-actions";
import Breadcrumb from "@/components/breadcrumb";
import Link from "next/link";

interface TicketDetailProps {
    params: Promise<{ id: string }>;
}

export default async function TicketDetailPage({ params }: TicketDetailProps) {
    const user = await getAuthenticatedUser();
    if (!user) redirect("/");

    const { id } = await params;

    const ticket = await prismaClient.ticket.findFirst({
        where: {
            id: id,
            customer: { userId: user.id }
        },
        include: {
            customer: true,
            interactions: {
                include: {
                    User: {
                        select: {
                            name: true,
                            image: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        }
    });

    if (!ticket) redirect("/dashboard");

    return (
        <Container>
            <main className="mt-9 mb-8">
                <Breadcrumb
                    items={[
                        { label: "Dashboard", href: "/dashboard" },
                        { label: "Chamados", href: "/dashboard" },
                        { label: "Detalhes" }
                    ]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm relative overflow-hidden">
                            <div className={`absolute top-0 left-0 w-1 h-full ${ticket.status === "ABERTO" ? "bg-blue-600" : "bg-green-600"}`}></div>

                            <div className="flex items-center justify-between mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                    ticket.status === "ABERTO" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                                }`}>
                                    {ticket.status}
                                </span>
                                <span className="text-sm text-slate-400">
                                    {new Date(ticket.created_at || "").toLocaleDateString('pt-BR')}
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold text-slate-800 mb-4">{ticket.name}</h1>

                            <div className="bg-slate-50 p-4 rounded-md border border-slate-100">
                                <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Descrição do Problema</h3>
                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {ticket.description}
                                </p>
                            </div>
                        </div>

                        <TicketTimeline
                            ticketId={ticket.id}
                            currentUserId={user.id}
                            initialInteractions={ticket.interactions}
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm">
                            <h2 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                                Dados do Cliente
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Nome</p>
                                    <Link
                                        href={`/dashboard/customer`}
                                        className="text-blue-600 font-medium hover:underline cursor-pointer"
                                    >
                                        {ticket.customer?.name}
                                    </Link>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Email</p>
                                    <p className="text-slate-700 break-all">{ticket.customer?.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Telefone</p>
                                    <p className="text-slate-700">{ticket.customer?.phone}</p>
                                </div>
                                {ticket.customer?.address && (
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold">Endereço</p>
                                        <p className="text-slate-700 text-sm">{ticket.customer.address}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm">
                            <h2 className="font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Ações</h2>
                            <TicketActions ticketId={ticket.id} status={ticket.status} />
                        </div>
                    </div>
                </div>
            </main>
        </Container>
    )
}

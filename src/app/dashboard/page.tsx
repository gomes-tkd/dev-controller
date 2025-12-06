import React from "react";
import Container from "@/components/ui/container";
import { redirect } from "next/navigation";
import Link from "next/link";
import TicketItem from "@/components/dashboard/ticket";
import { getAuthenticatedUser } from "@/lib/current-user";
import prismaClient from "@/lib/prisma";

export default async function DashboardPage() {
    const user = await getAuthenticatedUser();

    if (!user) {
        redirect("/");
    }

    const ticketsData = await prismaClient.ticket.findMany({
        where: {
            customer: {
                userId: user.id
            }
        },
        include: {
            customer: true
        },
        orderBy: {
            created_at: "desc"
        }
    });

    const tickets = ticketsData.map(ticket => {
        return {
            id: ticket.id,
            customer: ticket.customer?.name,
            description: ticket.description,
            date: ticket.created_at?.toLocaleDateString("pt-BR"),
            status: ticket.status
        }
    });

    return (
        <Container>
            <main className={"mt-9 mb-2"}>
                <div className={"flex items-center justify-between"}>
                    <h1 className={"text-3xl font-bold tracking-tight"}>Chamados</h1>
                    <Link
                        href={"/dashboard/new"}
                        className={
                            "bg-blue-600 hover:bg-blue-700 text-white px-4 " +
                            "py-2 rounded-md font-medium transition-colors shadow-sm"
                        }
                    >
                        Abrir chamado
                    </Link>
                </div>

                <div className={"overflow-x-auto mt-6 border border-slate-200 rounded-lg shadow-sm"}>
                    <table className={"min-w-full divide-y divide-slate-200 bg-white"}>
                        <thead className={"bg-slate-50"}>
                        <tr>
                            <th
                                className={
                                    "px-4 py-3 text-left text-xs font-medium " +
                                    "text-slate-500 uppercase tracking-wider"
                                }
                            >
                                Cliente
                            </th>
                            <th
                                className={
                                    "px-4 py-3 text-left text-xs font-medium " +
                                    "text-slate-500 uppercase tracking-wider hidden sm:table-cell"
                                }
                            >
                                Data Cadastro
                            </th>
                            <th
                                className={
                                    "px-4 py-3 text-left text-xs font-medium " +
                                    "text-slate-500 uppercase tracking-wider"
                                }
                            >
                                Status
                            </th>
                            <th
                                className={
                                    "px-4 py-3 text-left text-xs font-medium " +
                                    "text-slate-500 uppercase tracking-wider w-32"
                                }
                            >
                                #
                            </th>
                        </tr>
                        </thead>
                        <tbody className={"divide-y divide-slate-200 bg-white"}>
                        {tickets.map((ticket) => (
                            <TicketItem
                                key={ticket.id}
                                ticket={ticket}
                            />
                        ))}
                        </tbody>
                    </table>

                    {tickets.length === 0 && (
                        <div className={"text-center p-6 text-slate-500 text-sm"}>
                            Nenhum chamado encontrado.
                        </div>
                    )}
                </div>
            </main>
        </Container>
    );
}
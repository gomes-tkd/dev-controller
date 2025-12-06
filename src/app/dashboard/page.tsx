import React from "react";
import Container from "@/components/ui/container";
import { redirect } from "next/navigation";
import Link from "next/link";
import TicketItem from "@/components/dashboard/ticket";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import HeaderSearch from "@/components/dashboard/dashboard-header-search";
import DashboardCharts from "@/components/dashboard/dashboard-charts";
import { getAuthenticatedUser } from "@/lib/current-user";
import getDashboardData from "@/services/dashboard-service";
import Pagination from "@/components/dashboard/pagination";
import FilterStatus from "@/components/dashboard/filter-status";
import FilterPriority from "@/components/dashboard/filter-priority";

interface DashboardProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage({ searchParams }: DashboardProps) {
    const user = await getAuthenticatedUser();

    if (!user) {
        redirect("/");
    }

    const params = await searchParams;

    const searchText = typeof params.q === 'string' ? params.q : undefined;
    const statusFilter = typeof params.status === 'string' ? params.status : undefined;
    const priorityFilter = typeof params.priority === 'string' ? params.priority : undefined; // <--- NOVO

    const page = typeof params.page === 'string' ? Number(params.page) : 1;
    const currentPage = isNaN(page) || page < 1 ? 1 : page;

    const dashboard = await getDashboardData(
        user.id,
        searchText,
        currentPage,
        statusFilter,
        priorityFilter
    );

    return (
        <Container>
            <main className="mt-9 mb-2">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                        <FilterStatus />
                        <FilterPriority />
                        <HeaderSearch />

                        <Link
                            href="/dashboard/new"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 h-10 flex items-center justify-center rounded-md font-medium transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto"
                        >
                            Abrir chamado
                        </Link>
                    </div>
                </div>

                <DashboardStats
                    totalCustomers={dashboard.stats.totalCustomers}
                    totalTickets={dashboard.stats.totalTickets}
                    openTickets={dashboard.stats.openTickets}
                />

                <DashboardCharts
                    ticketsByStatus={dashboard.charts.status}
                    ticketsByCustomer={dashboard.charts.customers}
                />

                <div className="my-6 border-b border-slate-200"></div>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-700">Últimos Chamados</h2>
                    {(searchText || statusFilter || priorityFilter) && (
                        <div className="flex gap-2 items-center">
                            <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                Filtros ativos
                            </span>
                        </div>
                    )}
                </div>

                <div className="overflow-x-auto mt-2 border border-slate-200 rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-slate-200 bg-white">
                        <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-48">
                                Cliente
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Assunto
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden sm:table-cell w-32">
                                Data
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider hidden md:table-cell w-32">
                                Prioridade
                            </th>

                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-32">
                                Status
                            </th>

                            <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider w-24">
                                Ações
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                        {dashboard.tickets.map((ticket) => (
                            <TicketItem key={ticket.id} ticket={ticket} />
                        ))}
                        </tbody>
                    </table>

                    {dashboard.tickets.length === 0 && (
                        <div className="text-center p-10 bg-white">
                            <p className="text-slate-500 text-sm">
                                {searchText || statusFilter || priorityFilter
                                    ? "Nenhum chamado encontrado com os filtros selecionados."
                                    : "Você ainda não possui chamados registrados."}
                            </p>
                        </div>
                    )}
                </div>

                {dashboard.tickets.length > 0 && (
                    <Pagination
                        currentPage={dashboard.pagination.currentPage}
                        totalPages={dashboard.pagination.totalPages}
                    />
                )}

            </main>
        </Container>
    );
}
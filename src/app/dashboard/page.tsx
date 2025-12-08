import React from "react";
import Container from "@/components/ui/container";
import { redirect } from "next/navigation";
import Link from "next/link";
import TicketItem from "@/components/dashboard/ticket-item";
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
    const searchText = typeof params.q === "string" ? params.q : undefined;
    const statusFilter = typeof params.status === "string" ? params.status : undefined;
    const priorityFilter = typeof params.priority === "string" ? params.priority : undefined;

    const page = typeof params.page === "string" ? Number(params.page) : 1;
    const currentPage = isNaN(page) || page < 1 ? 1 : page;

    const dashboard = await getDashboardData(
        user.id,
        searchText,
        currentPage,
        statusFilter,
        priorityFilter
    );

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <Container>
                    <div className="mt-9 mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                                <FilterStatus />
                                <FilterPriority />
                                <HeaderSearch />
                                <Link
                                    href="/dashboard/new"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 h-10 flex items-center justify-center rounded-md font-medium transition-colors shadow-sm whitespace-nowrap w-full sm:w-auto cursor-pointer"
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

                        <div className="my-10 border-b border-slate-200"></div>

                        <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-4 py-3 text-left w-48 text-xs font-bold text-slate-500 uppercase">Cliente</th>
                                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Assunto</th>
                                    <th className="hidden lg:table-cell px-4 py-3 text-left w-32 text-xs font-bold text-slate-500 uppercase">Criação</th>
                                    <th className="px-4 py-3 text-left w-32 text-xs font-bold text-slate-500 uppercase">Vencimento</th>
                                    <th className="hidden md:table-cell px-4 py-3 text-left w-32 text-xs font-bold text-slate-500 uppercase">Prioridade</th>
                                    <th className="px-4 py-3 text-left w-32 text-xs font-bold text-slate-500 uppercase">Status</th>
                                    <th className="px-4 py-3 text-right w-24 text-xs font-bold text-slate-500 uppercase pr-6">Ações</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                {dashboard.tickets.map((ticket) => (
                                    <TicketItem key={ticket.id} ticket={ticket} />
                                ))}
                                </tbody>
                            </table>

                            {dashboard.tickets.length === 0 && (
                                <div className="text-center p-12">
                                    <p className="text-slate-500 text-sm italic">Nenhum chamado encontrado.</p>
                                </div>
                            )}
                        </div>

                        {dashboard.tickets.length > 0 && (
                            <Pagination
                                currentPage={dashboard.pagination.currentPage}
                                totalPages={dashboard.pagination.totalPages}
                            />
                        )}
                    </div>
                </Container>
            </main>
        </div>
    );
}
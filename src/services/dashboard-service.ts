import prismaClient from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default async function getDashboardData(userId: string, searchText?: string, page: number = 1) {
    const ITEMS_PER_PAGE = 10;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const whereClause: Prisma.TicketWhereInput = {
        customer: {
            userId: userId
        }
    };

    if (searchText) {
        whereClause.AND = {
            OR: [
                { name: { contains: searchText, mode: 'insensitive' } },
                { customer: { name: { contains: searchText, mode: 'insensitive' } } }
            ]
        };
    }

    const [
        totalCustomers,
        totalTickets,
        openTickets,
        ticketsData,
        ticketsByStatusRaw,
        topCustomersRaw,
        filteredTicketsCount
    ] = await Promise.all([
        prismaClient.customer.count({ where: { userId } }),
        prismaClient.ticket.count({ where: { customer: { userId } } }),
        prismaClient.ticket.count({ where: { customer: { userId }, status: "ABERTO" } }),

        prismaClient.ticket.findMany({
            where: whereClause,
            include: { customer: true },
            orderBy: { created_at: 'desc' },
            take: ITEMS_PER_PAGE,
            skip: skip
        }),

        prismaClient.ticket.groupBy({
            by: ['status'],
            where: { customer: { userId } },
            _count: { status: true }
        }),

        prismaClient.customer.findMany({
            where: { userId },
            select: {
                name: true,
                _count: { select: { tickets: true } }
            },
            take: 5,
            orderBy: { tickets: { _count: 'desc' } }
        }),

        prismaClient.ticket.count({
            where: whereClause
        })
    ]);

    const chartStatusData = ticketsByStatusRaw.map(item => ({
        name: item.status,
        value: item._count.status
    }));

    const chartCustomerData = topCustomersRaw.map(item => ({
        name: item.name,
        tickets: item._count.tickets
    }));

    const tickets = ticketsData.map(ticket => ({
        id: ticket.id,
        name: ticket.name,
        description: ticket.description,
        customer: ticket.customer?.name || "Cliente Desconhecido",
        date: ticket.created_at ? ticket.created_at.toLocaleDateString("pt-BR") : "",
        status: ticket.status,
        priority: ticket.priority
    }));

    return {
        stats: {
            totalCustomers: totalCustomers || 0,
            totalTickets: totalTickets || 0,
            openTickets: openTickets || 0
        },
        charts: { status: chartStatusData, customers: chartCustomerData },
        tickets: tickets,
        pagination: {
            total: filteredTicketsCount,
            totalPages: Math.ceil(filteredTicketsCount / ITEMS_PER_PAGE),
            currentPage: page
        }
    };
}
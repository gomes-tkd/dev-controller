import { FiUser, FiFileText, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

interface DashboardStatsProps {
    totalCustomers: number;
    totalTickets: number;
    openTickets: number;
}

export default function DashboardStats({ totalCustomers, totalTickets, openTickets }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            <Link href="/dashboard/customer" className="group">
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:border-blue-400 hover:shadow-md cursor-pointer">
                    <div className="p-3 bg-blue-50 rounded-full text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <FiUser size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Total Clientes</p>
                        <span className="text-2xl font-bold text-slate-900">{totalCustomers}</span>
                    </div>
                </div>
            </Link>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-slate-100 rounded-full text-slate-600">
                    <FiFileText size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Total Chamados</p>
                    <span className="text-2xl font-bold text-slate-900">{totalTickets}</span>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-amber-200 border-l-4 border-l-amber-500 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-full text-amber-600">
                    <FiCheckCircle size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Chamados Abertos</p>
                    <span className="text-2xl font-bold text-slate-900">{openTickets}</span>
                </div>
            </div>

        </div>
    );
}
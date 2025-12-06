import { FiUsers, FiFileText, FiCheckCircle } from "react-icons/fi";

interface DashboardStatsProps {
    totalCustomers: number;
    totalTickets: number;
    openTickets: number;
}

export default function DashboardStats({ totalCustomers, totalTickets, openTickets }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    <FiUsers size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Total Clientes</p>
                    <h3 className="text-2xl font-bold text-slate-900">{totalCustomers}</h3>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-slate-100 rounded-full text-slate-600">
                    <FiFileText size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Total Chamados</p>
                    <h3 className="text-2xl font-bold text-slate-900">{totalTickets}</h3>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                    <FiCheckCircle size={24} />
                </div>
                <div>
                    <p className="text-sm text-slate-500 font-medium">Chamados Abertos</p>
                    <h3 className="text-2xl font-bold text-slate-900">{openTickets}</h3>
                </div>
            </div>

        </div>
    );
}
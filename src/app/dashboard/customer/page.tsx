import Container from "@/components/ui/container";
import { getAuthenticatedUser } from "@/lib/current-user";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FiUser, FiPhone, FiMail, FiPlus } from "react-icons/fi";

export default async function CustomerPage() {
    const user = await getAuthenticatedUser();

    if (!user) {
        redirect("/");
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            created_at: 'desc'
        }
    });

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Meus Clientes</h1>

                    <Link
                        href="/dashboard/customer/new"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <FiPlus size={20} />
                        Novo Cliente
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {customers.map((customer) => (
                        <Link
                            key={customer.id}
                            href={`/dashboard/customer/${customer.id}`}
                            className="group block"
                        >
                            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden">

                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-blue-500 transition-colors" />

                                <div className="space-y-3 pl-2">
                                    <div className="flex items-center justify-between">
                                        <h2 className="font-bold text-lg text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                                            {customer.name}
                                        </h2>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-sm text-slate-500 flex items-center gap-2">
                                            <FiMail className="text-slate-400" size={16} />
                                            <span className="truncate">{customer.email}</span>
                                        </div>
                                        <div className="text-sm text-slate-500 flex items-center gap-2">
                                            <FiPhone className="text-slate-400" size={16} />
                                            <span>{customer.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center pl-2">
                                    <span className="text-xs text-slate-400">
                                        Clique para editar
                                    </span>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-100 transition-colors">
                                        Editar
                                    </span>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>

                {customers.length === 0 && (
                    <div className="text-center mt-20 p-10 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                        <div className="flex justify-center mb-4">
                            <div className="bg-white p-4 rounded-full shadow-sm">
                                <FiUser size={32} className="text-slate-400" />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">Nenhum cliente cadastrado</h3>
                        <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                            Comece cadastrando seus clientes para gerenciar os chamados de forma organizada.
                        </p>
                        <Link
                            href="/dashboard/customer/new"
                            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
                        >
                            Cadastrar primeiro cliente <FiPlus />
                        </Link>
                    </div>
                )}
            </main>
        </Container>
    );
}
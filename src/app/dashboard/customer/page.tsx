import React from "react";
import Link from "next/link";
import Container from "@/components/ui/container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Card, { CustomerProps } from "@/components/card";

export default async function CustomerPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/");
    }

    const customers: CustomerProps[] = [
        { id: 1, name: "Mercado Silva", email: "contato@mercadosilva.com", phone: "54 9999-9999" },
        { id: 2, name: "Oficina Tech Solutions", email: "pedro@techsolutions.com", phone: "51 8888-8888" },
        { id: 3, name: "Padaria Central", email: "padaria@gmail.com", phone: "11 7777-7777" },
        { id: 4, name: "Academia BodyFit", email: "contato@bodyfit.com.br", phone: "21 3333-2222" },
    ];

    return (
        <Container>
            <main className={"mt-9 mb-2"}>
                <div className={"flex items-center justify-between"}>
                    <h1 className={"text-3xl font-bold tracking-tight"}>Meus Clientes</h1>
                    <Link
                        href={"/dashboard/customer/new"}
                        className={
                            "bg-blue-600 hover:bg-blue-700 text-white px-4 " +
                            "py-2 rounded-md font-medium transition-colors shadow-sm"
                        }
                    >
                        Novo Cliente
                    </Link>
                </div>

                <section className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"}>
                    {customers.map((customer) => (
                        <Card
                            key={customer.id}
                            customer={customer}
                        />
                    ))}
                </section>

                {customers.length === 0 && (
                    <div
                        className={
                            "text-center mt-10 p-8 bg-slate-50 rounded-lg " +
                            "border border-dashed border-slate-300"
                        }
                    >
                        <h2 className={"text-lg font-medium text-slate-700"}>Nenhum cliente cadastrado</h2>
                        <p className={"text-slate-500 text-sm mt-1"}>Comece adicionando seu primeiro cliente acima.</p>
                    </div>
                )}
            </main>
        </Container>
    );
}
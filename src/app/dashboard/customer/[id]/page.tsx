import { getAuthenticatedUser } from "@/lib/current-user";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import CustomerForm from "@/components/form";
import Container from "@/components/ui/container";
import Link from "next/link";

interface EditCustomerProps {
    params: Promise<{ id: string }>;
}

export default async function EditCustomerPage({ params }: EditCustomerProps) {
    const user = await getAuthenticatedUser();

    if (!user) {
        redirect("/");
    }

    const { id } = await params;

    const customer = await prismaClient.customer.findFirst({
        where: {
            id: id,
            userId: user.id
        }
    });

    if (!customer) {
        redirect("/dashboard/customer");
    }

    return (
        <Container>
            <main className="mb-2 mt-9">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href="/dashboard/customer"
                        className="bg-slate-200 px-4 py-2 rounded text-slate-700 hover:bg-slate-300 transition-colors text-sm font-medium"
                    >
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Editar Cliente</h1>
                </div>

                <CustomerForm userId={user.id} customer={customer} />
            </main>
        </Container>
    )
}
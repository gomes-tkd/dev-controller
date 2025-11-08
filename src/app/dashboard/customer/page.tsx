import Container from "@/components/container";
import Link from "next/link";
import CustomerCard from "@/app/dashboard/customer/components/card";

export default function CustomerPage() {
    return (
        <Container>
            <main className={"mt-9 mb-2"}>
                <div className={"flex items-center justify-between"}>
                    <h1 className={"text-3xl font-bold"}>Meus Clientes</h1>
                    <Link
                        href={"/dashboard/customer/new"}
                        className={"bg-blue-500 text-white px-4 py-1 rounded"}
                    >
                        Novo Cliente
                    </Link>
                </div>
                <section className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4"}>
                    <CustomerCard />
                    <CustomerCard />
                    <CustomerCard />
                </section>
            </main>
        </Container>
    );
}

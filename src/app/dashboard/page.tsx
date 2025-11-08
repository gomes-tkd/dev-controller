import React from "react";

export default function DashboardPage() {

    return (
        <main className={"flex items-center flex-col justify-center min-h-[calc(100vh-80px)]"}>
            <h2 className={"font-medium text-2xl mb-2"}>Bem-vindo ao Dashboard</h2>
            <h1 className={"font-bold text-3xl mb-8 text-blue-600 md:text-4xl"}>
                Gerencie suas atividades aqui
            </h1>
        </main>
    );
}

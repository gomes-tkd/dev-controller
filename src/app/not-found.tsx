import React from "react";
import Link from "next/link";

export default function NotFound() {
    return (
        <main
            className={
                "w-full flex flex-col justify-center items-center max-w-7xl mx-auto gap-4"
            }
            style={{ height: "80vh" }}
        >
            <h1>
                Página não encontrada!
            </h1>
            <Link
                className={"font-bold text-2xl pl-1 hover:tracking-widest duration-300"}
                style={{ marginBottom: '1rem', display: 'inline-block' }}
                href={"/"}
            >
                Voltar para <span className={"text-blue-500"}>HOME!</span>
            </Link>
        </main>
    );
}

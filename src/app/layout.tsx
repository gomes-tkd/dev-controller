import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AuthProvider from "./providers/auth";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Dev Controle - Seu sistema de gerenciamento.",
    description: "Gerencie seus clientes e atendimentos de forma mais simples e segura. " +
        "SITE FICTÍCIO PARA PROJETO ACADÊMICO.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-br">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <div className={"flex flex-col min-h-screen"}>
                        <Header />
                        <main className={"flex-1 w-full"}>
                            {children}
                        </main>
                        <Footer />
                    </div>
                    <Toaster
                        position={"bottom-right"}
                        richColors
                        closeButton
                        theme={"light"}
                    />
                </AuthProvider>
            </body>
        </html>
    );
}
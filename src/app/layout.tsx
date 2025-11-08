import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Container from "@/components/container";
import AuthProvider from "@/providers/auth";

const inter = Inter({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Dev Controller - Seu sistema de gerenciamento de projetos e clientes",
  description: "Gerencie seus projetos e clientes de forma eficiente com o Dev Controller, a ferramenta definitiva para desenvolvedores. Organize tarefas, acompanhe prazos e mantenha tudo sob controle. Experimente agora e leve sua produtividade ao próximo nível! - SITE FICTÍCIO desenvolvido para portfólio pessoal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased`}
      >
        <AuthProvider>
            <Header />
            <Container>
                {children}
            </Container>
        </AuthProvider>
      </body>
    </html>
  );
}

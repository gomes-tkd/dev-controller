import React from "react";
import Container from "@/components/ui/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/");
    }

    return (
        <Container>
            <h1>Dashboard</h1>
        </Container>
    );
}

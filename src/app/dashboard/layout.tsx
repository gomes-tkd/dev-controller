import React from "react";
import DashboardHeader from "@/app/dashboard/components/header";
import { getUserSession } from "@/get-data/get-data";
import { verifySession } from "@/get-data/verify-session";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getUserSession();
    const invalid = verifySession(session);

    if (invalid) {
        return invalid
    }

    return (
        <>
            <DashboardHeader />
            { children }
        </>
    );
}

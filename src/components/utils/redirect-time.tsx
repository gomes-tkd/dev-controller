"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function RedirectTimer() {
    const router = useRouter();

    React.useEffect(() => {
        const timerId = setTimeout(() => {
            router.push("/");
        }, 3000);

        return () => clearTimeout(timerId);
    }, [router]);

    return null;
}

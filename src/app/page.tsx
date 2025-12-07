"use client";

import { useState } from "react";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import ModalAuth from "@/components/modal/modal-auth";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">

            <Hero onOpenAuth={() => setIsModalOpen(true)} />

            <Features />

            <ModalAuth
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </div>
    );
}
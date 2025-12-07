"use client";

import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import ModalDeleteAccount from "@/components/modal/modal-delete-account";

export default function DangerZone() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-red-50 p-6 border border-red-100 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-100 p-2 rounded-full text-red-600">
                        <FiTrash2 size={20} />
                    </div>
                    <h2 className="font-bold text-red-700">Zona de Perigo</h2>
                </div>
                <p className="text-sm text-red-600/80 mb-4">
                    Ao deletar sua conta, todos os seus tickets e clientes serão removidos permanentemente.
                </p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="cursor-pointer text-red-600 text-sm font-bold hover:underline"
                >
                    Quero deletar minha conta
                </button>
            </div>

            <ModalDeleteAccount
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
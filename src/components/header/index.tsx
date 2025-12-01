"use client";
import React from "react";
import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
    const { status, data } = useSession();

    async function handleLogin() {
        await signIn();
    }

    async function handleLogout() {
        await signOut();
    }

    return (
        <header className={"w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm"}>
            <div className={"w-full flex items-center justify-between max-w-7xl mx-auto"}>
                <Link href={"/"}>
                    <h1 className={"font-bold text-2xl pl-1 hover:tracking-widest duration-300"}>
                        <span className="text-blue-500">DEV</span>
                        Controle
                    </h1>
                </Link>

                <div className={"flex items-center gap-4"}>

                    {status === "loading" && (
                        <button className={"animate-spin cursor-not-allowed"}>
                            <FiLoader size={26} color={"#4b5563"} />
                        </button>
                    )}

                    {status === "unauthenticated" && (
                        <button onClick={handleLogin} className={"cursor-pointer hover:opacity-70 transition-opacity"}>
                            <div className={"flex items-center gap-2"}>
                                <span className={"text-sm font-medium text-gray-600"}>Entrar</span>
                                <FiLock size={26} color={"#4b5563"} />
                            </div>
                        </button>
                    )}

                    {status === "authenticated" && (
                        <div className={"flex items-baseline gap-4"}>
                            <Link href={"/dashboard"} className={"cursor-pointer hover:opacity-70 transition-opacity"}>
                                <FiUser size={26} color={"#4b5563"} />
                            </Link>

                            <button onClick={handleLogout} className={"cursor-pointer hover:opacity-70 transition-opacity"}>
                                <FiLogOut size={26} color={"#4b5563"} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
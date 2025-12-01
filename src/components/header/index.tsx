"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiLogOut, FiLock, FiLoader } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
    const { status, data: session } = useSession();

    async function handleLogin() {
        await signIn(undefined, { callbackUrl: "/dashboard" });
    }

    async function handleLogout() {
        await signOut({ callbackUrl: "/" });
    }

    return (
        <header
            className={
                "sticky top-0 z-50 w-full px-4 py-4 h-20 bg-white/80 " +
                "backdrop-blur-md border-b border-slate-200 shadow-sm"
            }
        >
            <div className={"w-full flex items-center justify-between max-w-7xl mx-auto"}>
                <Link href={"/"}>
                    <h1 className={"font-bold text-2xl hover:opacity-80 transition-opacity duration-200"}>
                        <span className={"text-blue-600"}>DEV</span>
                        <span className={"text-slate-900"}>Controle</span>
                    </h1>
                </Link>

                <div className={"flex items-center gap-4"}>
                    {status === "loading" && (
                        <div
                            className={
                                "flex items-center gap-2 px-4 py-2 rounded-full " +
                                "bg-slate-50 border border-slate-100 transition-all cursor-wait"
                            }
                        >
                            <FiLoader size={20} className={"animate-spin text-blue-600"} />
                            <span className={"text-sm font-medium text-slate-500 hidden sm:block"}>
                                Carregando...
                            </span>
                        </div>
                    )}

                    {status === "unauthenticated" && (
                        <button
                            onClick={handleLogin}
                            className={
                                "cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border " +
                                "border-slate-200 text-slate-700 hover:bg-slate-50 " +
                                "hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                            }
                        >
                            <span className={"text-sm font-medium"}>Acessar</span>
                            <FiLock size={18} />
                        </button>
                    )}

                    {status === "authenticated" && (
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link
                                href={"/dashboard"}
                                className={
                                    "flex items-center gap-3 py-1 px-2 rounded-lg " +
                                    "hover:bg-slate-100 transition-colors duration-200"
                                }
                            >
                                <span className={"hidden sm:block text-sm font-medium text-slate-700"}>
                                    Olá, {session?.user?.name?.split(" ")[0]}
                                </span>

                                <div
                                    className={
                                        "relative w-10 h-10 rounded-full overflow-hidden border " +
                                        "border-slate-200 ring-2 ring-transparent " +
                                        "hover:ring-blue-100 transition-all"
                                    }
                                >
                                    {session?.user?.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt={"Foto de perfil"}
                                            fill
                                            className={"object-cover"}
                                            sizes={"40px"}
                                            priority
                                        />
                                    ) : (
                                        <div
                                            className={
                                                "w-full h-full bg-blue-600 flex items-center " +
                                                "justify-center text-white font-bold text-lg"
                                            }
                                        >
                                            {session?.user?.name?.[0]?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                </div>
                            </Link>

                            <div className={"h-8 w-[1px] bg-slate-200 mx-1 hidden sm:block"}></div>

                            <button
                                onClick={handleLogout}
                                className={
                                    "cursor-pointer p-2 rounded-full text-slate-500 " +
                                    "hover:bg-red-50 hover:text-red-600 transition-colors duration-200 group"
                                }
                                title={"Sair do sistema"}
                            >
                                <FiLogOut size={22} className={"group-hover:translate-x-1 transition-transform"} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
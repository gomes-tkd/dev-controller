"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiLogOut, FiLock } from "react-icons/fi";
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
        <header className={"w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm z-50 relative"}>
            <div className={"w-full flex items-center justify-between max-w-7xl mx-auto"}>
                <Link href={"/"}>
                    <h1 className={"font-bold text-2xl pl-1 hover:tracking-widest duration-300"}>
                        <span className={"text-blue-500"}>DEV</span>
                        Controle
                    </h1>
                </Link>

                <div className={"flex items-center gap-4"}>

                    {/* LOADING STATE */}
                    {status === "loading" && (
                        <div className={"flex items-center gap-4 animate-pulse"}>
                            <div className={"h-4 w-24 bg-gray-200 rounded-md hidden sm:block"}></div>
                            <div className={"h-10 w-10 bg-gray-200 rounded-full"}></div>
                        </div>
                    )}

                    {/* UNAUTHENTICATED */}
                    {status === "unauthenticated" && (
                        <button
                            onClick={handleLogin}
                            className={"cursor-pointer group flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-all duration-200"}
                        >
                          <span className={"text-sm font-medium text-gray-700 group-hover:text-blue-600"}>
                            Acessar
                          </span>
                            <FiLock size={20} className={"text-gray-500 group-hover:text-blue-600 transition-colors"} />
                        </button>
                    )}

                    {/* AUTHENTICATED */}
                    {status === "authenticated" && (
                        <div className={"flex items-center gap-4"}>
                            <Link href={"/dashboard"} className={"flex items-center gap-3 hover:opacity-80 transition-opacity"}
                        >
                            <span className={"hidden sm:block text-sm font-medium text-gray-700"}>
                              Olá, {session?.user?.name?.split(" ")[0]}
                            </span>

                                <div className={"relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm"}>
                                    {session?.user?.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt={"Foto de perfil"}
                                            fill
                                            className={"object-cover"}
                                            sizes={"40px"}
                                        />
                                    ) : (
                                        <div className={"w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold"}>
                                            {session?.user?.name?.[0] || "U"}
                                        </div>
                                    )}
                                </div>
                            </Link>

                            <div className={"h-6 w-[1px] bg-gray-300 mx-1"}></div>

                            <button
                                onClick={handleLogout}
                                className={"cursor-pointer p-2 rounded-full hover:bg-red-50 hover:text-red-600 text-gray-500 transition-colors"}
                                title={"Sair"}
                            >
                                <FiLogOut size={22} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
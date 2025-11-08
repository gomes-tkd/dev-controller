"use client";
import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiUser, FiLogOut, FiLogIn, FiLoader } from 'react-icons/fi';

export default function Header() {
    const { status, data } = useSession();

    async function handleSignIn() {
        await signIn();
    }

    async function handleSignOut() {
        await signOut();
    }

    return (
        <header
            className={"w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm"}
        >
            <div className={"w-full flex items-center justify-between max-w-7xl mx-auto"}>
                <Link href={"/"}>
                    <h1 className={"font-bold text-2xl pl-1 hover:tracking-widest duration-300"}>
                        <span className={"text-blue-500"}>DEV</span> CONTROLLER
                    </h1>
                </Link>

                {(status === "loading") && (
                    <button className={"animate-spin"}>
                        <FiLoader size={28} color={"#4b5563"} />
                    </button>
                )}

                {(status === "unauthenticated") && (
                    <button
                        onClick={handleSignIn}
                        className={"cursor-pointer flex items-center gap-2"}
                    >
                        <FiLogIn size={28} color={"#4b5563"} /> Entrar
                    </button>
                )}

                {(status === "authenticated") && (
                    <div className={"flex items-baseline gap-4"}>
                        <Link href={"/dashboard"}>
                            <FiUser size={28} color={"#4b5563"} />
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className={"cursor-pointer"}
                        >
                            <FiLogOut size={28} color={"#c10007"} />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

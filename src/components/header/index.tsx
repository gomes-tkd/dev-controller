import React from "react";
import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function Header() {
  return (
    <header
      className={"w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm"}
    >
      <div
        className={"w-full flex items-center justify-between max-w-7xl mx-auto"}
      >
        <Link href="/">
          <h1
            className={
              "font-bold text-2xl pl-1 hover:tracking-widest duration-300"
            }
          >
            <span className={"text-blue-500"}>DEV</span>
            Controle
          </h1>
        </Link>
      </div>

      <div className={"flex items-baseline gap-4 "}>
        <Link href="/dashboard" className={"cursor-pointer"}>
          <FiUser size={26} color={"# 4b5563"} />
        </Link>

        <button className={"cursor-pointer"}>
          <FiLogOut size={26} color={"# 4b5563"} />
        </button>
      </div>
    </header>
  );
}

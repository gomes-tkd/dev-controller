import React from "react";
import Image from "next/image";
import HomeImage from "@/assets/hero-image.svg";
import Link from "next/link";
import { FiArrowRight, FiHeadphones } from "react-icons/fi";

export default function Home() {
  return (
      <main className={"flex flex-col items-center justify-center w-full py-20"}>
          <h2 className={"font-medium text-2xl mb-2"}>Gerencie sua empresa</h2>
          <h1 className={"font-bold text-3xl text-blue-600 mb-8"}>Atendimentos, clientes</h1>
          <div className={"relative w-full max-w-sm md:max-w-md lg:max-w-lg"}>
              <Image
                  src={HomeImage}
                  alt={"Imagem Hero"}
                  width={600}
                  height={600}
                  className={"object-contain"}
                  priority
              />
          </div>

          <div className="flex flex-col mt-8 items-center gap-3 animate-in slide-in-from-bottom-8 duration-700">
              <p className="text-slate-500 text-sm font-medium">
                  Precisa de ajuda com nossos serviços?
              </p>

              <Link
                  href="/open"
                  className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
              >
                  <div className="bg-slate-100 p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                      <FiHeadphones size={20} className="text-slate-600 group-hover:text-blue-600" />
                  </div>
                  <span className="font-semibold text-slate-700 group-hover:text-blue-700">
                      Abrir novo chamado
                  </span>
                  <FiArrowRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
      </main>
  );
}

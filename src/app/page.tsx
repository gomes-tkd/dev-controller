import React from "react";
import Image from "next/image";
import HomeImage from "@/assets/hero-image.svg";

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
      </main>
  );
}

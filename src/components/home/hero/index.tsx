import Image from "next/image";
import Link from "next/link";
import HomeImage from "@/assets/hero-image.svg";
import { FiHeadphones, FiLogIn } from "react-icons/fi";
import Container from "@/components/ui/container";

interface HeroProps {
    onOpenAuth: () => void;
}

export default function Hero({ onOpenAuth }: HeroProps) {
    return (
        <main className="flex-1">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24 gap-12">
                    <div className="max-w-xl space-y-8 text-center md:text-left">
                        <div className="space-y-4">
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wide">
                                Versão 2.0 Disponível
                            </span>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                Controle total sobre seus <span className="text-blue-600">atendimentos</span>.
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Gerencie chamados, acompanhe métricas em tempo real e ofereça um suporte de excelência para seus clientes em uma única plataforma.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="/open"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                            >
                                <FiHeadphones size={20} />
                                Abrir Novo Chamado
                            </Link>

                            <button
                                onClick={onOpenAuth}
                                className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-lg font-bold hover:bg-slate-50 transition-all"
                            >
                                <FiLogIn size={20} />
                                Acessar Sistema
                            </button>
                        </div>
                    </div>

                    <div className="relative w-full max-w-lg">
                        <Image
                            src={HomeImage}
                            alt="Gestão de Atendimentos"
                            width={600}
                            height={600}
                            className="object-contain drop-shadow-xl"
                            priority
                        />
                    </div>
                </div>
            </Container>
        </main>
    );
}
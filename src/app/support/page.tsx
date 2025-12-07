import Container from "@/components/ui/container";
import Link from "next/link";
import { FiMail, FiMessageCircle, FiHelpCircle } from "react-icons/fi";

export default function SupportPage() {
    return (
        <Container>
            <main className="py-16 md:py-24">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Central de Ajuda
                    </h1>
                    <p className="text-lg text-slate-600">
                        Estamos aqui para ajudar. Se você tiver problemas técnicos, dúvidas sobre o plano ou sugestões, entre em contato.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                            <FiMail size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">E-mail</h3>
                        <p className="text-slate-500 mb-4 text-sm">
                            Para assuntos gerais e suporte técnico detalhado.
                        </p>
                        <a href="mailto:suporte@devcontrole.com" className="text-blue-600 font-bold hover:underline">
                            suporte@devcontrole.com
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                            <FiMessageCircle size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">Chat</h3>
                        <p className="text-slate-500 mb-4 text-sm">
                            Disponível para planos Pro em horário comercial.
                        </p>
                        <span className="text-slate-400 font-medium cursor-not-allowed">
                            Indisponível no momento
                        </span>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                            <FiHelpCircle size={24} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">FAQ</h3>
                        <p className="text-slate-500 mb-4 text-sm">
                            Perguntas frequentes sobre uso do sistema.
                        </p>
                        <Link href="/faq" className="text-blue-600 font-bold hover:underline">
                            Ver Perguntas
                        </Link>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto bg-slate-50 p-8 rounded-xl border border-slate-100">
                    <h2 className="font-bold text-slate-800 text-xl mb-6">Perguntas Frequentes</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-slate-900 mb-2">Como resetar minha senha?</h3>
                            <p className="text-slate-600 text-sm">
                                Como utilizamos login social (Google), você deve gerenciar sua senha diretamente nas configurações da sua conta Google.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 mb-2">Posso exportar meus dados?</h3>
                            <p className="text-slate-600 text-sm">
                                Sim, entre em contato com o suporte para solicitar um dump completo dos seus dados em formato JSON ou CSV.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </Container>
    );
}
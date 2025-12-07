"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { FiPlus, FiMinus, FiSearch } from "react-icons/fi";

const faqData = [
    {
        category: "Geral",
        questions: [
            {
                question: "O DevControle é gratuito?",
                answer: "Sim, oferecemos um plano gratuito vitalício para pequenos times. Para recursos avançados como relatórios personalizados e automações, temos planos pagos."
            },
            {
                question: "Posso usar no celular?",
                answer: "Sim, nossa plataforma é 100% responsiva e funciona perfeitamente em navegadores mobile, sem necessidade de instalar aplicativos."
            }
        ]
    },
    {
        category: "Gerenciamento de Chamados",
        questions: [
            {
                question: "Como excluir um chamado?",
                answer: "Acesse o dashboard, localize o chamado na lista e clique no ícone de lixeira. Se você não tiver permissão de administrador, essa opção pode não estar visível."
            },
            {
                question: "O cliente recebe notificação?",
                answer: "Atualmente, as notificações são enviadas por e-mail sempre que o status do chamado é alterado por um atendente."
            },
            {
                question: "Posso reabrir um chamado fechado?",
                answer: "Sim, basta acessar os detalhes do chamado encerrado e alterar o status para 'Aberto' ou 'Pendente' novamente."
            }
        ]
    },
    {
        category: "Conta e Segurança",
        questions: [
            {
                question: "Como altero minha senha?",
                answer: "Como o login é realizado via Google, você deve alterar sua senha diretamente nas configurações da sua conta Google."
            },
            {
                question: "Meus dados estão seguros?",
                answer: "Sim, utilizamos criptografia de ponta a ponta e seguimos rigorosamente as diretrizes da LGPD para proteção de dados."
            }
        ]
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleAccordion = (index: string) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredData = faqData.map(group => ({
        ...group,
        questions: group.questions.filter(
            q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(group => group.questions.length > 0);

    return (
        <Container>
            <main className="py-16 md:py-24 max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Perguntas Frequentes
                    </h1>
                    <p className="text-lg text-slate-600">
                        Tire suas dúvidas sobre o funcionamento do DevControle.
                    </p>
                </div>

                <div className="relative mb-12">
                    <input
                        type="text"
                        placeholder="Buscar dúvida..."
                        className="w-full px-6 py-4 pl-12 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-700"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch className="absolute left-4 top-4 text-slate-400" size={24} />
                </div>

                <div className="space-y-10">
                    {filteredData.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
                                {group.category}
                            </h2>
                            <div className="space-y-3">
                                {group.questions.map((item, itemIndex) => {
                                    const uniqueId = `${groupIndex}-${itemIndex}`;
                                    const isOpen = openIndex === uniqueId;

                                    return (
                                        <div
                                            key={uniqueId}
                                            className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-blue-200"
                                        >
                                            <button
                                                onClick={() => toggleAccordion(uniqueId)}
                                                className="cursor-pointer w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                                            >
                                                <span className={`font-medium ${isOpen ? "text-blue-600" : "text-slate-700"}`}>
                                                    {item.question}
                                                </span>
                                                {isOpen ? (
                                                    <FiMinus className="text-blue-600 flex-shrink-0" />
                                                ) : (
                                                    <FiPlus className="text-slate-400 flex-shrink-0" />
                                                )}
                                            </button>

                                            {isOpen && (
                                                <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed bg-slate-50 border-t border-slate-100">
                                                    <div className="pt-4">
                                                        {item.answer}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {filteredData.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-500">Nenhuma pergunta encontrada para sua busca.</p>
                        </div>
                    )}
                </div>
            </main>
        </Container>
    );
}
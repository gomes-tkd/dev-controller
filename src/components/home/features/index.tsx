import { FiLayout, FiBarChart2, FiArrowRight } from "react-icons/fi";
import Container from "@/components/ui/container";

export default function Features() {
    return (
        <section className="bg-slate-50 py-20 border-t border-slate-100">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                            <FiLayout size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Dashboard Intuitivo</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Tenha uma visão panorâmica de todos os chamados abertos, pendentes e fechados em uma única tela.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mb-6">
                            <FiBarChart2 size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Métricas Reais</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Acompanhe o desempenho do seu time e identifique gargalos com gráficos de fácil leitura.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-6">
                            <FiArrowRight size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Automação Simples</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Fluxos de trabalho otimizados para reduzir o tempo de resposta e aumentar a satisfação.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
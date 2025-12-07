import Container from "@/components/ui/container";

export default function PrivacyPage() {
    return (
        <Container>
            <main className="py-16 md:py-24 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                    Política de Privacidade
                </h1>

                <div className="prose prose-slate max-w-none text-slate-600">
                    <p className="lead text-lg mb-6">
                        Sua privacidade é importante para nós. É política do DevControle respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site DevControle.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Coleta de Informações</h2>
                    <p className="mb-4">
                        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Uso de Dados (Google Auth)</h2>
                    <p className="mb-4">
                        Nosso serviço utiliza autenticação via Google. Coletamos apenas seu nome, endereço de e-mail e foto de perfil fornecidos publicamente pelo Google para criar sua identificação em nossa plataforma. Não temos acesso à sua senha do Google.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Retenção de Dados</h2>
                    <p className="mb-4">
                        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Compartilhamento com Terceiros</h2>
                    <p className="mb-4">
                        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                    </p>
                </div>
            </main>
        </Container>
    );
}
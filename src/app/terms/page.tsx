import Container from "@/components/ui/container";

export default function TermsPage() {
    return (
        <Container>
            <main className="py-16 md:py-24 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                    Termos de Uso
                </h1>

                <div className="prose prose-slate max-w-none text-slate-600">
                    <p className="lead text-lg mb-6">
                        Última atualização: 07 de Dezembro de 2025.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Aceitação dos Termos</h2>
                    <p className="mb-4">
                        Ao acessar e usar o DevControle, você aceita e concorda em estar vinculado aos termos e disposições deste contrato. Além disso, ao usar os serviços particulares deste site, você deve estar sujeito a todas as regras ou diretrizes publicadas aplicáveis a esses serviços.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Descrição do Serviço</h2>
                    <p className="mb-4">
                        O DevControle fornece aos usuários acesso a ferramentas de gestão de chamados e clientes. Você é responsável por obter acesso ao Site, e esse acesso pode envolver taxas de terceiros (como provedores de serviços de Internet ou taxas de tempo de antena).
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Sua Conta</h2>
                    <p className="mb-4">
                        Se você usar este site, você é responsável por manter a confidencialidade de sua conta e senha e por restringir o acesso ao seu computador, e você concorda em aceitar a responsabilidade por todas as atividades que ocorram sob sua conta ou senha.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Cancelamento e Rescisão</h2>
                    <p className="mb-4">
                        Você pode cancelar sua conta a qualquer momento através do painel de controle. O DevControle reserva-se o direito de encerrar ou suspender sua conta e acesso ao Serviço a qualquer momento, sem aviso prévio, em caso de violação destes Termos.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Limitação de Responsabilidade</h2>
                    <p className="mb-4">
                        Em nenhum caso o DevControle será responsável por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou exemplares, resultantes do uso ou da incapacidade de usar o serviço.
                    </p>
                </div>
            </main>
        </Container>
    );
}
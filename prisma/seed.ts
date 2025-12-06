import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const MY_EMAIL = "jgomestkd@gmail.com";

    console.log('🌱 Iniciando seed...')

    const user = await prisma.user.findUnique({
        where: { email: MY_EMAIL }
    });

    if (!user) {
        console.error(`❌ ERRO CRÍTICO: Usuário ${MY_EMAIL} não encontrado!`);
        console.error("👉 PASSO 1: Rode o projeto (npm run dev)");
        console.error("👉 PASSO 2: Faça login no navegador com este email");
        console.error("👉 PASSO 3: Só depois rode este comando de seed");
        process.exit(1);
    }

    console.log(`👤 Usuário encontrado: ${user.name} (${user.id})`)
    console.log("🧹 Limpando dados antigos deste usuário...")

    await prisma.ticket.deleteMany({ where: { userId: user.id } });
    await prisma.customer.deleteMany({ where: { userId: user.id } });

    const customerNames = [
        "Mercado Silva", "Padaria do João", "Açougue Boi Gordo", "Farmácia Saúde Total",
        "Quitanda da Maria", "Floricultura Bela Flor", "Barbearia do Zé", "Salão de Beleza Glamour",
        "Lavanderia Bolha Azul", "Pet Shop Amigo Fiel", "Papelaria Escolar", "Banca de Jornal Central",
        "Oficina Mecânica Veloz", "Escritório de Advocacia Santos", "Consultório Dr. Pedro",
        "Clínica Veterinária Vida", "Estúdio de Pilates Corpo", "Academia BodyFit",
        "Auto Escola Direção", "Despachante Rápido", "Imobiliária Lar Doce Lar",
        "Seguradora Confiança", "Gráfica Expressa", "Assistência Técnica Celular",
        "Restaurante Sabor Caseiro", "Pizzaria Napoli", "Hamburgueria Top", "Sushi Bar Zen",
        "Cafeteria Aroma", "Doceria Doce Vida", "Sorveteria Gelato", "Churrascaria Gaúcha",
        "Food Truck do Chef", "Buffet Festa Alegre", "Pastelaria Crocante",
        "Loja de Roupas Fashion", "Sapataria Conforto", "Ótica Visão Clara", "Joalheria Brilho",
        "Loja de Informática Byte", "Móveis Planejados Madeira", "Material de Construção Forte",
        "Auto Peças Brasil", "Livraria Leitura", "Brinquedoteca Feliz", "Loja de Presentes Mágica",
        "Tech Solutions Ltda", "Construtora Horizonte", "Transportadora Rápida", "Hotel Central",
        "Agência de Viagens Mundo", "Escola de Idiomas Global", "Colégio Saber", "Faculdade Futuro",
        "Coworking Espaço", "StartUp Inovação", "Consultoria Financeira Meta", "Agência de Marketing Digital",
        "Logística Express", "Segurança Forte"
    ];

    const ticketDescriptions = [
        "Computador não liga", "Impressora sem tinta", "Internet lenta", "Sistema travando",
        "Preciso formatar o PC", "Instalar Office", "Erro na emissão de nota", "Backup de arquivos",
        "Configurar roteador", "Trocar senha do wifi", "Monitor piscando", "Teclado com defeito",
        "Mouse não funciona", "Atualizar Windows", "Vírus no computador"
    ];

    const statuses = ["ABERTO", "PENDENTE", "FECHADO"];
    const priorities = ["BAIXA", "MEDIA", "ALTA"];

    let ticketsCreated = 0;

    console.log("🚀 Criando clientes e tickets...")

    for (const name of customerNames) {
        const customer = await prisma.customer.create({
            data: {
                name: name,
                email: `contato@${name.toLowerCase().replace(/\s+/g, '').replace(/[^\w-]+/g, '')}.com`,
                phone: "(11) 99999-9999",
                address: "Rua Exemplo, 123",
                userId: user.id
            }
        });

        const numberOfTickets = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < numberOfTickets; i++) {
            await prisma.ticket.create({
                data: {
                    name: ticketDescriptions[Math.floor(Math.random() * ticketDescriptions.length)],
                    description: "Cliente reportou problema técnico e solicita suporte remoto ou presencial.",
                    status: statuses[Math.floor(Math.random() * statuses.length)],
                    priority: priorities[Math.floor(Math.random() * priorities.length)],
                    customerId: customer.id,
                    userId: user.id
                }
            });
            ticketsCreated++;
        }
    }

    console.log(`✅ SUCESSO!`)
    console.log(`📦 ${customerNames.length} Clientes criados para ${user.email}`)
    console.log(`🎫 ${ticketsCreated} Tickets criados.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
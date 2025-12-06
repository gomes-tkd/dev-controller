import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Iniciando seed do banco de dados...')

    let user = await prisma.user.findFirst();

    if (!user) {
        console.log('⚠️ Nenhum usuário encontrado. Criando usuário de teste...')
        user = await prisma.user.create({
            data: {
                name: "Dev Teste",
                email: "teste@dev.com",
                image: "https://github.com/shadcn.png",
            }
        })
    }

    console.log(`👤 Dados serão vinculados ao usuário: ${user.name} (${user.email})`)

    const customerNames = [
        "Mercado Silva", "Padaria do João", "Oficina Mecânica Veloz", "Escritório de Advocacia Santos",
        "Consultório Dr. Pedro", "Restaurante Sabor Caseiro", "Tech Solutions Ltda", "Academia BodyFit",
        "Salão de Beleza Glamour", "Farmácia Saúde Total", "Loja de Roupas Fashion", "Supermercado Preço Bom",
        "Transportadora Rápida", "Colégio Saber", "Pizzaria Napoli", "Pet Shop Amigo Fiel",
        "Construtora Forte", "Imobiliária Lar Doce Lar", "Cafeteria Aroma", "Livraria Leitura",
        "Auto Peças Brasil", "Clínica Veterinária", "Hotel Central", "Agência de Viagens Mundo",
        "Gráfica Expressa", "Floricultura Bela Flor", "Barbearia do Zé", "Estúdio de Pilates",
        "Doceria Doce Vida", "Loja de Informática Byte"
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

    for (const name of customerNames) {
        const customer = await prisma.customer.create({
            data: {
                name: name,
                email: `contato@${name.toLowerCase().replace(/\s+/g, '')}.com`,
                phone: "(11) 99999-9999",
                address: "Rua Exemplo, 123 - Centro",
                userId: user.id
            }
        });

        const numberOfTickets = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < numberOfTickets; i++) {
            await prisma.ticket.create({
                data: {
                    name: ticketDescriptions[Math.floor(Math.random() * ticketDescriptions.length)],
                    description: "O cliente relatou o problema por telefone e aguarda visita técnica urgente.",
                    status: statuses[Math.floor(Math.random() * statuses.length)],
                    priority: priorities[Math.floor(Math.random() * priorities.length)],
                    customerId: customer.id,
                    userId: user.id
                }
            });
            ticketsCreated++;
        }
    }

    console.log(`✅ Seed finalizado com sucesso!`)
    console.log(`📦 Criados ${customerNames.length} Clientes.`)
    console.log(`🎫 Criados ${ticketsCreated} Tickets.`)
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
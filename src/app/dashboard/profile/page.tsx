import Container from "@/components/ui/container";
import { getAuthenticatedUser } from "@/lib/current-user";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/profile/form"; // Vamos criar logo abaixo
import { FiUser, FiCreditCard, FiTrash2 } from "react-icons/fi";

export default async function ProfilePage() {
    const user = await getAuthenticatedUser();

    if (!user) {
        redirect("/");
    }

    return (
        <Container>
            <main className="mt-9 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Minha Conta</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm">
                            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                                <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                                    <FiUser size={20} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-800 text-lg">Dados Pessoais</h2>
                                    <p className="text-sm text-slate-500">Gerencie suas informações básicas</p>
                                </div>
                            </div>

                            <ProfileForm
                                defaultName={user.name || ""}
                                email={user.email || ""}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-emerald-50 p-2 rounded-full text-emerald-600">
                                    <FiCreditCard size={20} />
                                </div>
                                <h2 className="font-bold text-slate-800">Seu Plano</h2>
                            </div>

                            <div className="mb-4">
                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-emerald-200">
                                    Plano Gratuito
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-4">
                                Você está usando a versão gratuita. Upgrade em breve.
                            </p>
                            <button disabled className="w-full bg-slate-100 text-slate-400 font-bold py-2 rounded-md text-sm cursor-not-allowed">
                                Gerenciar Assinatura
                            </button>
                        </div>

                        <div className="bg-red-50 p-6 border border-red-100 rounded-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-red-100 p-2 rounded-full text-red-600">
                                    <FiTrash2 size={20} />
                                </div>
                                <h2 className="font-bold text-red-700">Zona de Perigo</h2>
                            </div>
                            <p className="text-sm text-red-600/80 mb-4">
                                Ao deletar sua conta, todos os seus tickets e clientes serão removidos permanentemente.
                            </p>
                            <button className="text-red-600 text-sm font-bold hover:underline">
                                Quero deletar minha conta
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </Container>
    );
}
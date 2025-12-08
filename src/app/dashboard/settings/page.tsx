import Container from "@/components/ui/container";
import { getAuthenticatedUser } from "@/lib/current-user";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FiUsers, FiMail } from "react-icons/fi";
import InviteForm from "@/components/team/invite-form";
import InvitationProps from "@/utils/invitation-type";

export default async function SettingsPage() {
    const user = await getAuthenticatedUser();
    if (!user) redirect("/");

    const team = user.teamId ? await prismaClient.team.findUnique({
        where: { id: user.teamId },
        include: {
            users: true,
            invitations: true
        }
    }) : null;

    return (
        <Container>
            <main className="mt-9 mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Definições da Equipa</h1>

                {!team ? (
                    <div className="bg-blue-50 p-8 rounded-lg border border-blue-100 text-center">
                        <h2 className="text-xl font-bold text-blue-900 mb-2">Você ainda não tem equipa</h2>
                        <p className="text-blue-700 mb-6">Crie uma equipa para colaborar com outros atendentes.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                                    <FiUsers /> Membros Ativos
                                </h3>
                                <div className="divide-y divide-slate-100">
                                    {team.users.map((member) => (
                                        <div key={member.id} className="py-3 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-blue-600">
                                                    {member.name?.[0]}
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">{member.name}</span>
                                            </div>
                                            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-wider">Membro</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <FiMail /> Convidar Membro
                                </h3>
                                <InviteForm />

                                <div className="mt-8 border-t border-slate-100 pt-4">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Convites Pendentes</h4>
                                    {team.invitations.length === 0 && (
                                        <p className="text-xs text-slate-400 italic">Nenhum convite ativo.</p>
                                    )}
                                    {team.invitations.map((inv: InvitationProps) => (
                                        <div key={inv.id} className="text-xs text-slate-600 bg-slate-50 p-3 rounded mb-2 border border-slate-100 flex items-center justify-between">
                                            <span>{inv.email}</span>
                                            <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">AGUARDANDO</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </Container>
    );
}
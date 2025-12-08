import { Resend } from "resend";
import generateEmailHtml from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const FROM_EMAIL = "DevControle <onboarding@resend.dev>";

export async function sendTicketCreated(to: string, ticketId: string, ticketTitle: string) {
    try {
        const html = generateEmailHtml({
            subject: "Chamado Recebido",
            ticketId,
            body: `<p>Olá,</p><p>Seu chamado <strong>"${ticketTitle}"</strong> foi registrado com sucesso.</p>`,
            actionUrl: `${BASE_URL}/dashboard/ticket/${ticketId}`,
            actionText: "Ver Chamado"
        });

        await resend.emails.send({ from: FROM_EMAIL, to, subject: `[Recebido] ${ticketTitle}`, html });
    } catch (error) {
        console.error(error);
    }
}

export async function sendNewInteraction(to: string, ticketId: string, content: string) {
    try {
        const html = generateEmailHtml({
            subject: "Nova Resposta no Suporte",
            ticketId,
            body: `<p>Houve uma nova resposta no seu chamado:</p><blockquote style="border-left: 4px solid #e5e7eb; padding-left: 16px; margin: 16px 0; font-style: italic;">"${content}"</blockquote>`,
            actionUrl: `${BASE_URL}/dashboard/ticket/${ticketId}`,
            actionText: "Responder"
        });

        await resend.emails.send({ from: FROM_EMAIL, to, subject: `[Atualização] #${ticketId.slice(0, 6)}`, html });
    } catch (error) {
        console.error(error);
    }
}

export async function sendTicketStatusChanged(to: string, ticketId: string, ticketTitle: string, status: string) {
    try {
        const html = generateEmailHtml({
            subject: status === "FECHADO" ? "Chamado Encerrado" : "Chamado Reaberto",
            ticketId,
            body: `<p>O status do chamado <strong>"${ticketTitle}"</strong> foi alterado para <strong>${status}</strong>.</p>`,
            actionUrl: `${BASE_URL}/dashboard/ticket/${ticketId}`,
            actionText: "Ver Detalhes"
        });

        await resend.emails.send({ from: FROM_EMAIL, to, subject: `[${status}] ${ticketTitle}`, html });
    } catch (error) {
        console.error(error);
    }
}

export async function sendTeamInvitation(to: string, teamName: string, inviteId: string) {
    try {
        const html = generateEmailHtml({
            subject: "Convite para Equipe",
            ticketId: inviteId,
            body: `<p>Olá,</p><p>Você foi convidado para se juntar à equipe <strong>${teamName}</strong> no DEVControle.</p>`,
            actionUrl: `${BASE_URL}/invite/${inviteId}`,
            actionText: "Aceitar Convite"
        });

        await resend.emails.send({ from: FROM_EMAIL, to, subject: `Convite: Equipe ${teamName}`, html });
    } catch (error) {
        console.error(error);
    }
}

const emailService = {
    sendTicketCreated,
    sendNewInteraction,
    sendTicketStatusChanged,
    sendTeamInvitation
};

export default emailService;
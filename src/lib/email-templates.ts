export default function generateEmailHtml(props: {
    subject: string;
    body: string;
    ticketId: string;
    actionUrl?: string;
    actionText?: string;
}) {
    const { subject, body, ticketId, actionUrl, actionText } = props;

    const developerName = "José Gomes";
    const developerRole = "Fullstack Developer";
    const portfolioUrl = "https://seu-portfolio.com";
    const linkedinUrl = "https://www.linkedin.com/in/jose-bolivar-gomes/";
    const contactEmail = "jgomestkd@gmail.com";

    const primaryColor = "#2563eb";
    const backgroundColor = "#f4f4f5";

    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: ${backgroundColor}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div style="background-color: #18181b; color: #a1a1aa; text-align: center; padding: 8px; font-size: 12px;">
                Este é um e-mail de demonstração do projeto <strong>DevControle</strong> desenvolvido por ${developerName}.
            </div>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <tr>
                    <td style="padding: 24px; background-color: ${primaryColor}; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 1px;">DEVControle</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 40px 32px;">
                        <h2 style="margin-top: 0; margin-bottom: 24px; color: #18181b; font-size: 20px;">${subject}</h2>
                        <div style="color: #52525b; line-height: 1.6; font-size: 16px;">
                            ${body}
                        </div>
                        ${actionUrl ? `
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 32px; margin-bottom: 32px;">
                            <tr>
                                <td style="border-radius: 6px; background-color: ${primaryColor};">
                                    <a href="${actionUrl}" target="_blank" style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 6px;">
                                        ${actionText || "Acessar Sistema"}
                                    </a>
                                </td>
                            </tr>
                        </table>
                        ` : ""}
                        <hr style="margin: 32px 0; border: none; border-top: 1px solid #e4e4e7;" />
                        <p style="margin: 0; color: #a1a1aa; font-size: 12px;">
                            Chamado ID: <span style="font-family: monospace; background-color: #f4f4f5; padding: 4px 6px; border-radius: 4px; color: #333;">#${ticketId}</span>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 32px 24px; background-color: #fafafa; border-top: 1px solid #e4e4e7;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="margin: 0 0 8px 0; font-weight: bold; color: #3f3f46; font-size: 14px;">
                                        Sobre o Desenvolvedor
                                    </p>
                                    <p style="margin: 0 0 16px 0; color: #71717a; font-size: 13px; line-height: 1.5;">
                                        Olá! Eu sou <strong>${developerName}</strong>, ${developerRole}.<br/>
                                        Este sistema foi construído com Next.js 15, Server Actions, Prisma e Tailwind para demonstrar arquitetura escalável e clean code.
                                    </p>
                                    <div>
                                        <a href="${portfolioUrl}" style="color: ${primaryColor}; text-decoration: none; font-weight: bold; font-size: 13px; margin: 0 8px;">Meu Portfólio</a>
                                        <span style="color: #d4d4d8;">|</span>
                                        <a href="${linkedinUrl}" style="color: ${primaryColor}; text-decoration: none; font-weight: bold; font-size: 13px; margin: 0 8px;">LinkedIn</a>
                                        <span style="color: #d4d4d8;">|</span>
                                        <a href="mailto:${contactEmail}" style="color: ${primaryColor}; text-decoration: none; font-weight: bold; font-size: 13px; margin: 0 8px;">Contato</a>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
}
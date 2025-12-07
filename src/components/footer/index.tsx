import Link from "next/link";
import Container from "@/components/ui/container";

export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-slate-100 py-8 mt-auto">
            <Container>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>&copy; 2025 DevControle. Todos os direitos reservados.</p>
                    <div className="flex gap-6 font-medium">
                        <Link href="/terms" className="hover:text-blue-600 transition-colors">
                            Termos
                        </Link>
                        <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                            Privacidade
                        </Link>
                        <Link href="/support" className="hover:text-blue-600 transition-colors">
                            Suporte
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
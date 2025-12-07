"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FiX, FiMail, FiLock, FiUser, FiLoader, FiChrome } from "react-icons/fi";
import { toast } from "sonner";
import axiosApi from "@/lib/api";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ModalAuthProps {
    isOpen: boolean;
    onClose: () => void;
}

type AuthMode = "LOGIN" | "REGISTER";

export default function ModalAuth({ isOpen, onClose }: ModalAuthProps) {
    const router = useRouter();
    const [mode, setMode] = useState<AuthMode>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    if (!isOpen) return null;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (mode === "LOGIN") {
                const result = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });

                if (result?.error) {
                    toast.error("Email ou senha incorretos.");
                } else {
                    toast.success("Bem-vindo de volta!");
                    router.refresh();
                    router.push("/dashboard");
                    onClose();
                }
            } else {
                await axiosApi.post("/api/auth/register", formData);
                toast.success("Conta criada! Fazendo login...");

                const loginResult = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });

                if (!loginResult?.error) {
                    router.refresh();
                    router.push("/dashboard");
                    onClose();
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data as string);
            } else {
                console.error(error);
                toast.error("Ocorreu um erro. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: "/dashboard" });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row min-h-[500px] animate-in fade-in zoom-in duration-200 relative">

                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-600 bg-white/80 rounded-full p-1"
                >
                    <FiX size={24} />
                </button>

                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        {mode === "LOGIN" ? "Acesse sua conta" : "Crie sua conta"}
                    </h2>
                    <p className="text-slate-500 mb-8 text-sm">
                        {mode === "LOGIN" ? "Bem-vindo de volta ao DevControle" : "Comece a gerenciar seus chamados hoje"}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === "REGISTER" && (
                            <div className="relative">
                                <FiUser className="absolute left-3 top-3.5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Nome da Empresa"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        )}

                        <div className="relative">
                            <FiMail className="absolute left-3 top-3.5 text-slate-400" />
                            <input
                                type="email"
                                placeholder="Seu e-mail"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>

                        <div className="relative">
                            <FiLock className="absolute left-3 top-3.5 text-slate-400" />
                            <input
                                type="password"
                                placeholder="Sua senha"
                                required
                                minLength={6}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>

                        {mode === "LOGIN" && (
                            <div className="text-right">
                                <button type="button" className="cursor-pointer text-xs text-blue-600 hover:underline">
                                    Esqueceu a senha?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-2"
                        >
                            {isLoading && <FiLoader className="animate-spin" />}
                            {mode === "LOGIN" ? "ENTRAR" : "REGISTRAR CONTA"}
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400">Ou continue com</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="cursor-pointer w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-lg transition-all"
                    >
                        <FiChrome className="text-red-500" size={20} />
                        Google
                    </button>
                </div>

                <div className="w-full md:w-1/2 bg-slate-900 p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/0 z-0" />

                    <div className="relative z-10 text-center">
                        <h3 className="text-2xl font-bold mb-4">
                            {mode === "LOGIN" ? "Não tem uma conta?" : "Já é membro?"}
                        </h3>
                        <p className="text-slate-300 mb-8 leading-relaxed">
                            {mode === "LOGIN"
                                ? "Registre-se agora no DevControle para começar a gerenciar seus chamados de forma profissional e gratuita."
                                : "Acesse sua conta para continuar gerenciando seus clientes e atendimentos."}
                        </p>

                        <button
                            onClick={() => {
                                setMode(mode === "LOGIN" ? "REGISTER" : "LOGIN");
                                setFormData({ name: "", email: "", password: "" });
                            }}
                            className="cursor-pointer px-8 py-3 border-2 border-white/20 hover:border-white text-white rounded-lg font-bold transition-all hover:bg-white/5 mx-auto block"
                        >
                            {mode === "LOGIN" ? "CRIAR CONTA" : "FAZER LOGIN"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
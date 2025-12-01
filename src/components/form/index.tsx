"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";
// Importamos o schema e o tipo de fora
import { customerSchema, CustomerData } from "@/lib/schema";

export default function NewCustomerForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue // Usaremos isso para aplicar a máscara
    } = useForm<CustomerData>({
        resolver: zodResolver(customerSchema) // Usando o schema importado
    });

    // Função auxiliar simples para máscara de telefone (PT-BR)
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        // Remove tudo que não é número
        value = value.replace(/\D/g, "");
        // (99) 99999-9999
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");

        // Atualiza o valor no React Hook Form manualmente
        setValue("phone", value);
    };

    async function handleRegisterCustomer(data: CustomerData) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(data);
        toast.success("Cliente cadastrado com sucesso!");
        reset();
    }

    return (
        <form
            className="flex flex-col mt-6 bg-white p-6 rounded-lg border border-slate-100 shadow-sm"
            onSubmit={handleSubmit(handleRegisterCustomer)}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* NOTA: Removi o .map() por um momento para te mostrar como aplicar
                   a máscara no telefone explicitamente. O .map() é bom, mas
                   quando um campo precisa de comportamento especial (onChange customizado),
                   o código explícito é mais legível e seguro.
                */}

                <Input<CustomerData>
                    name="name"
                    label="Nome completo"
                    type="text"
                    placeholder="Digite o nome completo"
                    error={errors.name?.message}
                    register={register}
                    className="sm:col-span-2"
                />

                {/* CAMPO TELEFONE COM MÁSCARA */}
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-slate-700">Telefone</label>
                    <input
                        className={`w-full border rounded-md h-11 px-4 bg-white transition-all outline-none 
                            ${errors.phone
                            ? "border-red-500 focus:border-red-500"
                            : "border-slate-300 focus:border-blue-500"
                        }`}
                        placeholder="(DD) 99999-9999"
                        type="text"
                        // Aqui fazemos a junção do register com nossa máscara
                        {...register("phone", {
                            onChange: handlePhoneChange // Aplica a máscara a cada tecla
                        })}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 font-medium">{errors.phone.message}</p>
                    )}
                </div>

                <Input<CustomerData>
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Digite o email..."
                    error={errors.email?.message}
                    register={register}
                />

                <Input<CustomerData>
                    name="address"
                    label="Endereço completo"
                    type="text"
                    placeholder="Rua, Número, Bairro..."
                    error={errors.address?.message}
                    register={register}
                    className="sm:col-span-2"
                />

            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`
                    flex items-center justify-center gap-2 h-11 rounded-md text-white font-bold transition-all mt-6
                    ${isSubmitting ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"}
                `}
            >
                {isSubmitting ? <><FiLoader size={20} className="animate-spin" /> Salvando...</> : "Cadastrar Cliente"}
            </button>
        </form>
    );
}
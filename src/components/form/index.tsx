"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";
import { customerSchema, CustomerData } from "@/lib/schema";
import apiAxios from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NewCustomerForm({ userId }: { userId: string }) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue
    } = useForm<CustomerData>({
        resolver: zodResolver(customerSchema)
    });

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");

        setValue("phone", value);
    };

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleRegisterCustomer(data: CustomerData) {
        await apiAxios.post("/api/customer", {
            ...data,
            userId
        });

        toast.success("Cliente cadastrado com sucesso!");
        reset();

        await delay(2000);
        router.replace("/dashboard/customer");
    }

    return (
        <form
            className="flex flex-col mt-6 bg-white p-6 rounded-lg border border-slate-100 shadow-sm"
            onSubmit={handleSubmit(handleRegisterCustomer)}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input<CustomerData>
                    name="name"
                    label="Nome completo"
                    type="text"
                    placeholder="Digite o nome completo"
                    error={errors.name?.message}
                    register={register}
                    className="sm:col-span-2"
                />

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
                        {...register("phone", {
                            onChange: handlePhoneChange
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
                type={"submit"}
                disabled={isSubmitting}
                className={`
                    cursor-pointer flex items-center justify-center gap-2 h-11 rounded-md text-white font-bold transition-all mt-6
                    ${isSubmitting ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"}
                `}
            >
                {isSubmitting ? <><FiLoader size={20} className="animate-spin" /> Salvando...</> : "Cadastrar Cliente"}
            </button>
        </form>
    );
}
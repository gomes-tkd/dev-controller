"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";
import { customerSchema } from "@/lib/schema"; // Importe o schema
import { useRouter } from "next/navigation";
import { createCustomer, updateCustomer } from "@/actions/customer"; // Nossas Server Actions
import { z } from "zod";

type CustomerData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
    userId: string;
    customer?: {
        id: string;
        name: string;
        phone: string;
        email: string;
        address: string | null;
    }
}

export default function CustomerForm({ userId, customer }: CustomerFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue
    } = useForm<CustomerData>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            name: customer?.name || "",
            phone: customer?.phone || "",
            email: customer?.email || "",
            address: customer?.address || "",
        }
    });

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        setValue("phone", value);
    };

    async function handleRegisterCustomer(data: CustomerData) {
        let result;

        if (customer) {
            result = await updateCustomer(customer.id, data);
        } else {
            result = await createCustomer(data);
        }

        if (result.error) {
            toast.error(result.error);
            return;
        }

        toast.success(customer ? "Cliente atualizado com sucesso!" : "Cliente cadastrado com sucesso!");

        router.refresh();
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
                {isSubmitting ? (
                    <><FiLoader size={20} className="animate-spin" /> Salvando...</>
                ) : (
                    customer ? "Salvar Alterações" : "Cadastrar Cliente"
                )}
            </button>
        </form>
    );
}
"use client";
import React from "react";
import { RegisterOptions, UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> {
    type: string;
    placeholder: string;
    name: Path<T>;
    label?: string;
    register: UseFormRegister<T>;
    error?: string;
    rules?: RegisterOptions<T, Path<T>>;
    className?: string;
}

export default function Input<T extends FieldValues>({
    name,
    label,
    placeholder,
    register,
    rules,
    error,
    type,
    className
}: InputProps<T>) {
    return (
        <div className={`w-full ${className || ""}`}>
            {label && (
                <label
                    htmlFor={name}
                    className="block mb-2 text-sm font-medium text-slate-700"
                >
                    {label}
                </label>
            )}

            <input
                className={`w-full border rounded-md h-11 px-4 bg-white transition-all outline-none 
                ${error
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                }`}
                id={name}
                placeholder={placeholder}
                {...register(name, rules)}
                type={type}
            />

            {error && (
                <p className="text-red-500 text-sm mt-1 font-medium animate-pulse">
                    {error}
                </p>
            )}
        </div>
    );
}
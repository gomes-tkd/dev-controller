"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "@/actions/user";

const schema = z.object({
    name: z.string().min(2, "O nome é muito curto"),
});

type FormData = z.infer<typeof schema>;

interface ProfileFormProps {
    defaultName: string;
    email: string;
}

export default function ProfileForm({ defaultName, email }: ProfileFormProps) {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: defaultName
        }
    });

    async function handleUpdate(data: FormData) {
        const result = await updateUserProfile(data);

        if (result.error) {
            toast.error(result.error);
            return;
        }

        toast.success("Perfil atualizado com sucesso!");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                <input
                    type="text"
                    className="w-full border border-slate-300 rounded-md h-10 px-3 outline-none focus:border-blue-500 transition-colors"
                    {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                    type="text"
                    disabled
                    value={email}
                    className="w-full border border-slate-200 bg-slate-100 text-slate-500 rounded-md h-10 px-3 cursor-not-allowed"
                />
                <p className="text-xs text-slate-400 mt-1">O email não pode ser alterado.</p>
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {isSubmitting && <FiLoader className="animate-spin" />}
                    Salvar Alterações
                </button>
            </div>
        </form>
    );
}
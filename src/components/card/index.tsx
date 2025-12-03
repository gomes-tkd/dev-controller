import CustomerProps from "@/utils/customer.type";

export default function Card({ customer }: { customer: CustomerProps }) {
    return (
        <article 
            className={
                "flex flex-col justify-between bg-white border border-slate-200 " +
                "shadow-sm rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all duration-300"
            }
        >
            <div>
                <div className={"flex justify-between items-start mb-4"}>
                    <h2 className={"font-bold text-lg text-slate-800 truncate pr-2"}>{customer.name}</h2>
                    <div 
                        className={
                            "w-9 h-9 shrink-0 rounded-full bg-blue-100 flex " +
                            "items-center justify-center text-blue-600 text-xs font-bold border border-blue-200"
                        }
                    >
                        {customer.name.substring(0, 2).toUpperCase()}
                    </div>
                </div>

                <div className={"space-y-2 mb-4"}>
                    <p className={"text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center gap-1"}>
                        <span className={"text-xs uppercase font-bold text-slate-400 w-16"}>Email:</span>
                        <span className="truncate">{customer.email}</span>
                    </p>
                    <p className={"text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center gap-1"}>
                        <span className={"text-xs uppercase font-bold text-slate-400 w-16"}>Fone:</span>
                        <span>{customer.phone}</span>
                    </p>
                </div>
            </div>

            <button
                className={
                    "w-full py-2 text-sm font-medium text-red-600 bg-red-50 border cursor-pointer " +
                    "border-transparent rounded hover:bg-red-100 hover:border-red-200 transition-colors"
                }
            >
                Excluir
            </button>
        </article>
    );
}
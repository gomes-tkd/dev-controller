import { FiTrash2, FiFile } from "react-icons/fi";

export default function TicketItem() {
    return (
        <>
            <tr
                className={
                    "border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300"
                }
            >
                <td className={"text-left pl-1"}>Mercado Silva</td>
                <td className={"text-left hidden sm:table-cell"}>01/04/2025</td>
                <td className={"text-left"}>
                    <span className={"bg-green-500 px-2 py-1 rounded"}>aberto</span>
                </td>
                <td className={"text-left"}>
                    <button className={"mr-2 cursor-pointer"}>
                        <FiTrash2 size={28} color={"#ef4444"}/>
                    </button>
                    <button className={"cursor-pointer"}>
                        <FiFile size={28} color={"#3b82f6"}/>
                    </button>
                </td>
            </tr>
        </>
    )
}

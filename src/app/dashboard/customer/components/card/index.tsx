export default function CustomerCard() {
    return (
        <div
            className={"flex flex-col bg-gray-100 border-0.5 p-2 my-4 rounded-lg gap-2 hover:scale-105 duration-300"}
        >
            <h2>
                <span className={"font-bold"}>Nome:</span> Mercadito da silva
            </h2>
            <p>
                <span className={"font-bold"}>Email:</span> teste@mercaditodasilva.com
            </p>
            <p>
                <span className={"font-bold"}>Telefone:</span> (55) 99999-9999
            </p>
            <button
                className={
                    "cursor-pointer bg-red-800 px-4 rounded text-white mt-2 self-start hover:bg-red-500 hover:font-bold"
                }
            >
                DELETE
            </button>
        </div>
    );
}

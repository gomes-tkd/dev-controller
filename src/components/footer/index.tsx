export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={
        "w-full flex items-center px-4 py-4 bg-white h-20 shadow-[0_-5px_10px_rgba(0,0,0,0.1)] relative z-50"
      }
    >
      <div
        className={"w-full flex items-center justify-center max-w-7xl mx-auto"}
      >
        <p className={"text-center"}>
          <span className={"text-blue-500 font-bold"}>DEV</span>
          <span className={"font-bold"}>Controle</span> &copy; {currentYear}{" "}
          &bull; Todos os direitos reservados.{" "}
        </p>
      </div>
    </footer>
  );
}

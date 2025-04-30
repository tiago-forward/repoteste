import { Calendar, LogOut } from "lucide-react";
import { Separator } from "./ui/separator";
import NavLink from "./navLink";

export default function Sidebar() {
  return (
    <aside className="md:w-64 bg-sidebar text-sidebar-foreground h-screen p-2 md:p-4 flex flex-col border-r border-border">
      <div className="flex flex-col md:m-0">
        <h2 className="text-xl font-bold mt-4 hidden md:block">
          Painel do Colaborador
        </h2>{" "}
        <Separator className="my-4 w-full hidden md:block" />
        <nav className="flex flex-col gap-2 w-full">
          <NavLink href="/minha-escala">
            <Calendar size={18} />
            <span className="hidden md:inline ml-2">Minha Escala</span>{" "}
          </NavLink>
        </nav>
      </div>
      <button
        aria-label="Sair"
        className="cursor-pointer mt-auto flex items-center justify-center gap-2 rounded-lg hover:text-sidebar-primary hover:bg-secondary p-2 duration-300"
      >
        <LogOut size={18} />
        <span className="hidden md:inline ml-2">Sair</span>{" "}
      </button>
    </aside>
  );
}

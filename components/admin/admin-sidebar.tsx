import { CalendarCheck, LogOut, LayoutDashboard, Users } from "lucide-react";
import { Separator } from "../ui/separator";
import NavLink from "../navLink";

export const AdminSidebar = () => (
  <>
    {/* Sidebar Desktop */}
    <aside className="hidden lg:w-64 bg-sidebar text-sidebar-foreground h-screen p-2 lg:p-4 lg:flex flex-col border-r border-border">
      <div className="flex flex-col lg:m-0">
        <h2 className="text-xl font-bold mt-4 hidden lg:block">
          Painel do Master
        </h2>{" "}
        <Separator className="my-4 w-full hidden lg:block" />
        <nav className="flex flex-col gap-2 w-full">
          <NavLink href="/visao-geral">
            <LayoutDashboard size={18} />
            <span className="hidden lg:inline ml-2">Visão Geral</span>{" "}
          </NavLink>
          <NavLink href="/equipes">
            <Users size={18} />{" "}
            <span className="hidden lg:inline ml-2">Equipes</span>{" "}
          </NavLink>
          <NavLink href="/editar-escalas">
            <CalendarCheck size={18} />{" "}
            <span className="hidden lg:inline ml-2">Editar Escalas</span>{" "}
          </NavLink>
          {/* <NavLink href="/observacoes">
              <FileText size={18} /> Observações
            </NavLink> */}
        </nav>
      </div>
      <button
        aria-label="Sair"
        className="cursor-pointer mt-auto flex items-center justify-center gap-2 rounded-lg hover:text-sidebar-primary hover:bg-secondary p-2 duration-300"
      >
        <LogOut size={18} />
        <span className="hidden lg:inline ml-2">Sair</span>{" "}
      </button>
    </aside>

    {/* Bottom Nav Mobile */}
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-sidebar text-sidebar-foreground border-t border-border flex justify-around py-2 z-50">
      <NavLink href="/visao-geral">
        <LayoutDashboard size={22} />
      </NavLink>
      <NavLink href="/equipes">
        <Users size={22} />
      </NavLink>
      <NavLink href="/editar-escalas">
        <CalendarCheck size={22} />
      </NavLink>
      <button
        aria-label="Sair"
        className="cursor-pointer hover:text-sidebar-primary"
      >
        <LogOut size={22} />
      </button>
    </nav>
  </>
);

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import Sidebar from "@/components/sidebar";
import { CalendarProvider } from "@/contexts/CalendarContext";
import logo from "@/public/logo-main.png";
import Image from "next/image";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = false;

  return (
    <CalendarProvider>
      <header className="bg-sidebar py-1 text-sidebar-foreground border-b border-border">
        <div className="max-w-7xl mx-auto">
          <Image
            src={logo}
            alt="FDS Games"
            width={150}
            height={40}
            className="m-auto"
          />
        </div>
      </header>

      <div className="flex">
        {isAdmin ? <AdminSidebar /> : <Sidebar />}
        <main className="flex-1 bg-background p-6 min-h-screen">
          {children}
        </main>
      </div>
    </CalendarProvider>
  );
}

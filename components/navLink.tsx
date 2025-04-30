"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  children: ReactNode;
  href: string;
}

export default function NavLink({ children, href }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        isActive
          ? "flex items-center gap-2 p-2 duration-300 rounded-lg hover:bg-secondary text-sidebar-primary"
          : "flex items-center gap-2 p-2 duration-300 rounded-lg hover:bg-secondary"
      }
    >
      {children}
    </Link>
  );
}

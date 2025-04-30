import { ReactNode } from "react";

interface CalendarTableProps {
  children: ReactNode;
}

export const CalendarTable = ({ children }: CalendarTableProps) => (
  <table className="w-full table-fixed border-spacing-0.5">{children}</table>
);

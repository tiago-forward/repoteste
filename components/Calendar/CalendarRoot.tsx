import { ReactNode } from "react";

interface CalendarRootProps {
  children: ReactNode;
}

export const CalendarRoot = ({ children }: CalendarRootProps) => (
  <div className="flex flex-col gap-6 p-6 border border-border bg-card rounded-lg">
    {children}
  </div>
);

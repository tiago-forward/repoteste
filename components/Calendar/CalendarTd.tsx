import clsx from "clsx";
import { ReactNode, TdHTMLAttributes } from "react";

interface CalendarTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  disabled?: boolean;
}

export const CalendarTd = ({
  children,
  disabled,
  ...props
}: CalendarTdProps) => (
  <td
    {...props}
    className={clsx(
      "border border-border relative",
      disabled ? "" : "hover:bg-accent"
    )}
  >
    {children}
  </td>
);

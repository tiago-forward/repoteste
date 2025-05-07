import clsx from "clsx";
import { ReactNode, TdHTMLAttributes } from "react";

interface CalendarTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
  disabled?: boolean;
  selected?: boolean;
}

export const CalendarTd = ({
  children,
  disabled,
  selected,
  ...props
}: CalendarTdProps) => (
  <td
    {...props}
    className={clsx(
      "border border-border relative",
      !disabled && "hover:bg-accent cursor-pointer",
      selected && "border-2 border-primary rounded-md"
    )}
  >
    {children}
  </td>
);

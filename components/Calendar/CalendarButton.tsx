import { DayType } from "@/constants/calendar-data";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface CalendarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  dayType?: DayType;
}

export const CalendarButton = ({
  children,
  dayType = "default",
  ...props
}: CalendarButtonProps) => {
  // const typeStyles = {
  //   default: "",
  //   folga: "text-obs-2",
  //   trocado: "text-obs-1",
  //   observação: "text-obs-3",
  // };
  // ${typeStyles[dayType]}
  return (
    <button
      className={`cursor-pointer w-full text-center text-lg font-medium aspect-square disabled:opacity-50`}
      {...props}
    >
      {children}
    </button>
  );
};

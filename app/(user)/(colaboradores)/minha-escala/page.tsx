import { CalendarBox } from "@/components/Calendar/Calendar";
import { CalendarList } from "@/components/CalendarList";

export default function MinhaEscala() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <CalendarBox />
      <CalendarList />
    </div>
  );
}

export type DayType = "default" | "folga" | "trocado" | "observação";

export interface DayEntry {
  type: DayType;
  description?: string;
}

export type CalendarDayData = {
  types: DayEntry[];
};

export type CalendarMonthData = {
  [day: string]: CalendarDayData;
};

export type CalendarData = {
  [month: string]: CalendarMonthData;
};

export const calendarData: CalendarData = {
  "2025-03": {
    "2025-03-05": { types: [{ type: "folga" }] },
    "2025-03-10": { types: [{ type: "trocado", description: "Tiago - Luiz" }] },
    "2025-03-18": {
      types: [{ type: "trocado", description: "Tiago - Luiz" }],
    },
    "2025-03-25": { types: [{ type: "folga" }] },
  },
  "2025-04": {
    "2025-04-02": { types: [{ type: "folga" }] },
    "2025-04-04": { types: [{ type: "folga" }] },
    "2025-04-06": { types: [{ type: "folga" }] },
    "2025-04-10": {
      types: [
        { type: "folga" },
        { type: "trocado", description: "Tiago - Luiz" },
      ],
    },
    "2025-04-11": { types: [{ type: "folga" }] },
    "2025-04-13": { types: [{ type: "folga" }] },
    "2025-04-17": {
      types: [
        { type: "folga" },
        {
          type: "observação",
          description: "Dia reservado para treinamento técnico",
        },
      ],
    },
    "2025-04-20": { types: [{ type: "folga" }] },
    "2025-04-24": { types: [{ type: "folga" }] },
    "2025-04-25": { types: [{ type: "folga" }] },
    "2025-04-27": { types: [{ type: "folga" }] },
    "2025-04-31": { types: [{ type: "folga" }] },
    "2025-04-03": {
      types: [{ type: "trocado", description: "Tiago - Lavique" }],
    },
    "2025-04-18": { types: [{ type: "trocado", description: "Tiago - Luiz" }] },
    "2025-04-22": {
      types: [
        {
          type: "observação",
          description:
            "Treinamento obrigatório Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat omnis, alias aspernatur vitae molestias provident autem",
        },
      ],
    },
  },
  "2025-05": {
    "2025-05-03": { types: [{ type: "trocado", description: "Tiago - Luiz" }] },
    "2025-05-12": {
      types: [
        { type: "folga" },
        { type: "observação", description: "Início da revisão semestral" },
      ],
    },
    "2025-05-20": {
      types: [{ type: "observação", description: "Feedback individual" }],
    },
  },
};

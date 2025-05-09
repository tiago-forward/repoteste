interface GetWeekDaysParams {
  short?: boolean;
}

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat("pt-BR", { weekday: "long" });

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toUpperCase();
      }

      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1));
    });
}

// Essa função gera uma lista com os nomes dos dias da semana em português brasileiro (pt-BR).
// Ela pode retornar os nomes completos (segunda-feira, terça-feira, etc.) ou abreviados
// (SEG, TER, etc.), dependendo do valor do parâmetro short.

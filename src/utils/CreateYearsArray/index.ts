import { todayDate } from '../TodayDate';

export const createYearsArray = (): string[] => {
  const { currentYear } = todayDate();
  const END_YEAR = Number(currentYear);
  const START_YEAR = 2022;
  const times = END_YEAR - START_YEAR;

  const years = [String(START_YEAR)];

  for (let index = 0; index < times; index += 1) {
    const year = START_YEAR + (index + 1);
    years.push(String(year));
  }

  return years;
};

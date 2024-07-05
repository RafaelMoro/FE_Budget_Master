import { ABBREVIATED_MONTHS, CompleteMonthsType, MONTHS } from '../../globalInterface';

export const updateAbbreviatedMonth = ({ newMonth }: { newMonth: CompleteMonthsType; }) => {
  const monthIndex = MONTHS.indexOf(newMonth);
  return ABBREVIATED_MONTHS[monthIndex];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const sortByDate = (firstItem: any, secondItem: any) => +new Date(secondItem.date) - +new Date(firstItem.date);

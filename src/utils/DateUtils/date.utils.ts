import {
  ABBREVIATED_MONTHS, CompleteMonthsType, MONTHS,
} from '../../globalInterface';
import { ValidateMonthOlderRecordsProps } from './date.interface';

export const updateAbbreviatedMonth = ({ newMonth }: { newMonth: CompleteMonthsType; }) => {
  const monthIndex = MONTHS.indexOf(newMonth);
  return ABBREVIATED_MONTHS[monthIndex];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const sortByDate = (firstItem: any, secondItem: any) => +new Date(secondItem.date) - +new Date(firstItem.date);

export const validateMonthOlderRecords = ({ month, year }: ValidateMonthOlderRecordsProps) => {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-based index (0 = January, 1 = February, ..., 11 = December)
  const currentYear = now.getFullYear();

  const monthFormatted = ABBREVIATED_MONTHS.indexOf(month);
  const yearFormatted = Number(year);

  const inputDate = new Date(yearFormatted, monthFormatted);

  const isCurrentMonth = monthFormatted === currentMonth && yearFormatted === currentYear;
  const isLastMonth = (monthFormatted === currentMonth - 1 && yearFormatted === currentYear)
    || (currentMonth === 0 && monthFormatted === 12 && yearFormatted === currentYear - 1);
  const isFutureMonth = inputDate > now;

  return {
    isCurrentMonth,
    isLastMonth,
    isFutureMonth,
  };
};

export const getFutureDate = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const futureMonth = currentMonth + 1;
  const futureMonthName = MONTHS[futureMonth];

  return { futureMonth, futureMonthName };
};

export const getCurrentDate = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentMonthName = MONTHS[currentMonth];

  return { currentMonth, currentMonthName };
};

export const getLastMonthDate = () => {
  const now = new Date();
  const lastMonth = now.getMonth() - 1;
  const lastMonthName = MONTHS[lastMonth];

  return { lastMonth, lastMonthName };
};

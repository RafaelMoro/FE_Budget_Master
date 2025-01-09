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
    || (currentMonth === 0 && (monthFormatted === 12 || monthFormatted === 11) && yearFormatted === currentYear - 1);
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
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;
  const isDecember = currentMonth === 11;
  const futureMonth = isDecember ? 0 : currentMonth + 1;
  const futureMonthName = MONTHS[futureMonth];

  return {
    futureMonth, futureMonthName, currentYear, nextYear,
  };
};

export const getCurrentDate = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentMonthName = MONTHS[currentMonth];

  return { currentMonth, currentMonthName };
};

export const getLastMonthDate = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  let numberToSubtract = -1;

  if (currentMonth === 0) {
    numberToSubtract = 11;
  }

  const lastMonth = currentMonth + numberToSubtract;
  const lastMonthName = MONTHS[lastMonth];

  return { lastMonth, lastMonthName };
};

export const getTwoMonthBeforeLastMonth = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  let numberToSubtract = -3;

  if (currentMonth === 0) {
    numberToSubtract = 7;
  }
  if (currentMonth === 11) {
    numberToSubtract = 8;
  }
  if (currentMonth === 10) {
    numberToSubtract = 9;
  }

  const passedMonth = currentMonth + numberToSubtract;
  const passedMonthName = MONTHS[passedMonth];

  return { passedMonth, passedMonthName };
};

export const getRemainingDays = (endDate: string) => {
  const endDateFormatted = new Date(endDate);
  const today = new Date();
  const difference = endDateFormatted.getTime() - today.getTime();
  const restingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  return restingDays;
};

export const transformDateToMonthDay = (dateToFormat: string) => {
  // Transforming into date because came as string due non serializable redux state
  const date = new Date(dateToFormat);
  const month = date.getMonth();
  const day = date.getDate();

  return `${MONTHS[month]} ${day}`;
};

export const formatDateToDDMMYYYY = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-11) and pad with leading zero
  const year = date.getFullYear(); // Get the full year

  return `${month}/${day}/${year}`;
};

import { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {
  ABBREVIATED_MONTHS, AbbreviatedMonthsType, CompleteMonthsType, MONTHS,
} from '../../globalInterface';
import { createYearsArray } from '../../utils/CreateYearsArray';
import { SelectMonthYearValues } from '../../components/UI/Records/interface';
import { updateAbbreviatedMonth } from './date.utils';

dayjs.extend(utc);
dayjs.extend(timezone);

interface UseDateProps {
  // for older records, the mont and complete month should be the before last month
  isOlderRecords?: boolean;
}

const useDate = ({ isOlderRecords }: UseDateProps = {}) => {
  const dateOfToday = dayjs().tz('America/Mexico_City');
  const currentMonthNumber = dateOfToday.month();
  const currentMonth = ABBREVIATED_MONTHS[currentMonthNumber];
  const completeCurrentMonth = MONTHS[currentMonthNumber];
  const completeBeforeLastMonth = currentMonthNumber === 0 ? MONTHS[10] : MONTHS[currentMonthNumber - 2];

  // If we're on january, set last month as december
  const lastMonth = currentMonthNumber === 0 ? ABBREVIATED_MONTHS[11] : ABBREVIATED_MONTHS[currentMonthNumber - 1];
  const beforeLastMonth = currentMonthNumber === 0 ? ABBREVIATED_MONTHS[10] : ABBREVIATED_MONTHS[currentMonthNumber - 2];
  // If we're on january, set last month as december
  const completeLastMonth = currentMonthNumber === 0 ? MONTHS[11] : MONTHS[currentMonthNumber - 1];
  const currentYear = String(dateOfToday.year());
  const years: string[] = createYearsArray(currentYear);

  const [month, setMonth] = useState<AbbreviatedMonthsType>(isOlderRecords ? beforeLastMonth : currentMonth);
  const [completeMonth, setCompleteMonth] = useState<CompleteMonthsType>(isOlderRecords ? completeBeforeLastMonth : completeCurrentMonth);
  const [year, setYear] = useState<string>(currentYear);

  const updateYear = (newValue: string) => setYear(newValue);
  const updateMonth = (newMonth: AbbreviatedMonthsType) => setMonth(newMonth);
  const updateCompleteMonth = (newMonth: CompleteMonthsType) => setCompleteMonth(newMonth);

  const updateMonthAndYear = ({ month: newMonth, year: newYear }: SelectMonthYearValues) => {
    const updatedMonth = updateAbbreviatedMonth({ newMonth });
    updateMonth(updatedMonth);
    updateCompleteMonth(newMonth);
    updateYear(newYear);
  };

  return {
    month,
    completeMonth,
    lastMonth,
    beforeLastMonth,
    year,
    years,
    completeCurrentMonth,
    completeLastMonth,
    updateYear,
    updateMonth,
    updateCompleteMonth,
    updateMonthAndYear,
  };
};

export { useDate };

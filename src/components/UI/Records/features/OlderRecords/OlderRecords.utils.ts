import { AbbreviatedMonthsType, CompleteMonthsType } from '../../../../../globalInterface';
import { validateMonthOlderRecords } from '../../../../../utils';

interface ShowMessageOnDateProps {
  monthParam: AbbreviatedMonthsType;
  yearParam: string;
  completeMonth: CompleteMonthsType;
}

export const showMessageOnDate = ({
  monthParam, yearParam, completeMonth,
}: ShowMessageOnDateProps) => {
  const { isCurrentMonth, isFutureMonth, isLastMonth } = validateMonthOlderRecords({ month: monthParam, year: yearParam });
  // Do not fetch if isCurrentMonth or isFutureMonth or isLastMonth
  if (isCurrentMonth) {
    return `${completeMonth} records are shown above. Please select an older month.`;
  }
  if (isLastMonth) {
    return `${completeMonth} records are shown above. Please select an older month.`;
  }
  if (isFutureMonth) {
    return `You are selecting a date in the future: ${completeMonth} ${yearParam}. Please select an older month.`;
  }
  return '';
};

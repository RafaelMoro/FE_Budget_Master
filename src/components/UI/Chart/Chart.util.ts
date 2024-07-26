import { AnyRecord } from '../../../globalInterface';

export function getTopDaysExpensePerDay(records: AnyRecord[]) {
  const dayAmountMap = records.reduce<Record<string, number>>((acc, record) => {
    const { fullDate, amount } = record;
    if (!acc[fullDate]) {
      acc[fullDate] = 0;
    }
    if (record?.isPaid) {
      acc[fullDate] += amount;
    }
    return acc;
  }, {});

  // Filter out days with $0 amount
  const dayAmountMapFiltered = Object.entries(dayAmountMap).filter((item) => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [day, amount] = item;
    return amount > 0;
  });

  // Format the data to be used in the chart
  const result = dayAmountMapFiltered.map((item) => ({
    date: item[0],
    amount: item[1],
  }));
  const sortedData = result.toSorted((a, b) => b.amount - a.amount);

  return sortedData;
}

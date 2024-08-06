import { AnyRecord } from '../../../globalInterface';

export function getTopDaysExpensePerDay(records: AnyRecord[]) {
  const dayAmountMap = records.reduce<Record<string, number>>((acc, record) => {
    const { fullDate, amount } = record;
    if (!acc[fullDate]) {
      acc[fullDate] = 0;
    }
    // Verify if the record is an expense
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

export function getCategoriesTotalExpense(records: AnyRecord[]) {
  const categoryAmountMap = records.reduce<Record<string, number>>((acc, record) => {
    const { category: { categoryName }, amount } = record;
    if (!acc[categoryName]) {
      acc[categoryName] = 0;
    }
    // Verify if the record is an expense
    if (record?.isPaid) {
      acc[categoryName] += amount;
    }
    return acc;
  }, {});

  // Filter out days with $0 amount
  const categoryMapFiltered = Object.entries(categoryAmountMap).filter((item) => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [category, amount] = item;
    return amount > 0;
  });
  const result = categoryMapFiltered.map((item) => ({
    category: item[0],
    amount: item[1],
  }));
  const sortedCategoryData = result.toSorted((a, b) => b.amount - a.amount);
  return sortedCategoryData;
}

import { AnyRecord } from '../../../globalInterface';

export interface ChartExpensiveDaysData {
  date: string;
  amount: number;
}

export interface ChartCategoriesData {
  category: string;
  amount: number;
}

export interface ChartExpensiveDaysProps {
  records: AnyRecord[];
}

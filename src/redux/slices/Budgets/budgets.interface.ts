import { CreateBudgetValues } from '../../../components/UI/Budget/Budget.interface';

export interface CreateBudgetMutationProps {
  values: CreateBudgetValues;
  bearerToken: string;
}

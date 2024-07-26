import { CreateBudgetValuesApiRequest, DeleteBudgetValues, EditBudgetValuesApiRequest } from '../../../components/UI/Budget/Budget.interface';
import { BudgetUI } from '../../../globalInterface';

export interface BudgetsInitialState {
  budgets: BudgetUI[] | null;
}
export interface CreateBudgetMutationProps {
  values: CreateBudgetValuesApiRequest;
  bearerToken: string;
}

export interface EditBudgetMutationProps extends Omit<CreateBudgetMutationProps, 'values'> {
  values: EditBudgetValuesApiRequest;
}

export interface DeleteBudgetMutationProps {
  values: DeleteBudgetValues;
  bearerToken: string;
}

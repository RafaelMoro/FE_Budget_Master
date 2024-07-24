import { CreateBudgetValuesApiRequest, DeleteBudgetValues } from '../../../components/UI/Budget/Budget.interface';

export interface CreateBudgetMutationProps {
  values: CreateBudgetValuesApiRequest;
  bearerToken: string;
}

export interface DeleteBudgetMutationProps {
  values: DeleteBudgetValues;
  bearerToken: string;
}

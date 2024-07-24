import { CreateBudgetValuesApiRequest } from '../../../components/UI/Budget/Budget.interface';

export interface CreateBudgetMutationProps {
  values: CreateBudgetValuesApiRequest;
  bearerToken: string;
}

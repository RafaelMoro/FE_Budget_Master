import { GeneralError } from '../../globalInterface';
import { useCreateBudgetMutation, useDeleteBudgetMutation, useEditBudgetMutation } from '../../redux/slices/Budgets/budgets.api';
import { CreateBudgetValuesApiRequest, DeleteBudgetValues, EditBudgetValuesApiRequest } from '../../components/UI/Budget/Budget.interface';
import { useAppSelector } from '../../redux/hooks';

const useBudgets = () => {
  const [
    createBudgetMutation,
    { isLoading: isLoadingCreateBudget, isError: isErrorCreateBudget },
  ] = useCreateBudgetMutation();
  const [
    editBudgetMutation,
    { isLoading: isLoadingEditBudget, isError: isErrorEditBudget },
  ] = useEditBudgetMutation();
  const [deleteBudgetMutation, { isLoading: isLoadingDeleteBudget, isSuccess: isSuccessDeleteBudget }] = useDeleteBudgetMutation();

  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;

  const createBudget = async ({ values }: { values: CreateBudgetValuesApiRequest }) => {
    try {
      await createBudgetMutation({ values, bearerToken });
    } catch (err) {
      const errorCatched = err as GeneralError;
      // eslint-disable-next-line no-console
      console.error('Error while creating budget: ', errorCatched?.data?.message);
    }
  };

  const editBudget = async ({ values }: { values: EditBudgetValuesApiRequest }) => {
    try {
      await editBudgetMutation({ values, bearerToken });
    } catch (err) {
      const errorCatched = err as GeneralError;
      // eslint-disable-next-line no-console
      console.error('Error while editing budget: ', errorCatched?.data?.message);
    }
  };

  const deleteBudget = async ({ values }: { values: DeleteBudgetValues }) => {
    try {
      await deleteBudgetMutation({ values, bearerToken });
    } catch (err) {
      const errorCatched = err as GeneralError;
      // eslint-disable-next-line no-console
      console.error('Error while deleting budget: ', errorCatched?.data?.message);
    }
  };

  return {
    createBudget,
    deleteBudget,
    editBudget,
    isLoadingCreateBudget,
    isLoadingEditBudget,
    isLoadingDeleteBudget,
    isErrorCreateBudget,
    isErrorEditBudget,
    isSuccessDeleteBudget,
  };
};

export { useBudgets };

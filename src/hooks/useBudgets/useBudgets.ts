import { useNavigate } from 'react-router-dom';
import { SystemStateEnum } from '../../enums';
import { Actions, GeneralError } from '../../globalInterface';
import { BUDGETS_ROUTE } from '../../pages/RoutesConstants';
import { useNotification } from '../useNotification';
import { ShowErrorNotificationBudgetProps } from './useBudgets.interface';
import { useCreateBudgetMutation, useDeleteBudgetMutation, useEditBudgetMutation } from '../../redux/slices/Budgets/budgets.api';
import { CreateBudgetValuesApiRequest, DeleteBudgetValues, EditBudgetValuesApiRequest } from '../../components/UI/Budget/Budget.interface';
import { useAppSelector } from '../../redux/hooks';

const useBudgets = () => {
  const navigate = useNavigate();
  const { updateGlobalNotification } = useNotification({});

  const [
    createBudgetMutation,
    { isLoading: isLoadingCreateBudget, isError: isErrorCreateBudget },
  ] = useCreateBudgetMutation();
  const [editBudgetMutation] = useEditBudgetMutation();
  const [deleteBudgetMutation, { isLoading: isLoadingDeleteBudget }] = useDeleteBudgetMutation();

  const userReduxState = useAppSelector((state) => state.user);
  const bearerToken = userReduxState.userInfo?.bearerToken as string;

  const showErrorNotification = ({ errorMessage, action, goToBudgets = false }: ShowErrorNotificationBudgetProps) => {
    const actions: Actions = {
      create: 'creating',
      edit: 'editing',
    };
    const verb = actions[action.toLowerCase() as keyof typeof actions];
    updateGlobalNotification({
      newTitle: 'Error',
      newDescription: `Oops! An error ocurred while ${verb} your budget. Please try again later.`,
      newStatus: SystemStateEnum.Error,
    });
    // eslint-disable-next-line no-console
    console.error(`Error while submitting ${action} budget: ${errorMessage}`);

    if (goToBudgets) {
      // Navigate to dashboard
      setTimeout(() => {
        navigate(BUDGETS_ROUTE);
      }, 3000);
    }
  };

  const createBudget = async ({ values }: { values: CreateBudgetValuesApiRequest }) => {
    try {
      await createBudgetMutation({ values, bearerToken });
    } catch (err) {
      const errorCatched = err as GeneralError;
      showErrorNotification({
        errorMessage: errorCatched?.data?.message ?? '',
        action: 'Create',
        goToBudgets: true,
      });
    }
  };

  const editBudget = async ({ values }: { values: EditBudgetValuesApiRequest }) => {
    try {
      await editBudgetMutation({ values, bearerToken });
    } catch (err) {
      const errorCatched = err as GeneralError;
      showErrorNotification({
        errorMessage: errorCatched?.data?.message ?? '',
        action: 'Edit',
        goToBudgets: true,
      });
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
    isLoadingDeleteBudget,
    isErrorCreateBudget,
  };
};

export { useBudgets };

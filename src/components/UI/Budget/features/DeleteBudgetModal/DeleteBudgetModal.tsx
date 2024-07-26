import { Dialog } from '@mui/material';
import { Container, Title, WarnText } from './DeleteBudgetModal.styled';
import { BudgetUI } from '../../../../../globalInterface';
import { AppColors, CancelButton, SecondaryButton } from '../../../../../styles';
import { LoadingSpinner } from '../../../LoadingSpinner';
import { useBudgets } from '../../../../../hooks/useBudgets/useBudgets';
import { AppIcon } from '../../../Icons';

interface DeleteBudgetModalProps {
  open: boolean;
  onClose: () => void;
  budget: BudgetUI;
}

const DeleteBudgetModal = ({ open, onClose, budget }: DeleteBudgetModalProps) => {
  const { name } = budget;
  const { deleteBudget, isLoadingDeleteBudget: isLoading, isSuccessDeleteBudget: isSuccess } = useBudgets();

  const handleDelete = () => {
    deleteBudget({ values: { budgetId: budget._id } });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Container>
        <Title>
          Are you sure that you want to delete the budget:
          {' '}
          &quot;
          {name}
          &quot;
          ?
        </Title>
        <WarnText>You cannot reverse this action.</WarnText>
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        <CancelButton onClick={handleDelete}>
          { (!isLoading && !isSuccess) && 'Delete' }
          { (isLoading && !isSuccess) && <LoadingSpinner /> }
          { (!isLoading && isSuccess) && (<AppIcon icon="TickMark" fillColor={AppColors.white} />) }
        </CancelButton>
      </Container>
    </Dialog>
  );
};

export { DeleteBudgetModal };

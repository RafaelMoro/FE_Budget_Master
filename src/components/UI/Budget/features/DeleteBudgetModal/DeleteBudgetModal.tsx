import { Dialog } from '@mui/material';
import { Container, Title, WarnText } from './DeleteBudgetModal.styled';
import { BudgetUI } from '../../../../../globalInterface';
import { CancelButton, SecondaryButton } from '../../../../../styles';
import { LoadingSpinner } from '../../../LoadingSpinner';
import { useBudgets } from '../../../../../hooks/useBudgets/useBudgets';

interface DeleteBudgetModalProps {
  open: boolean;
  onClose: () => void;
  budget: BudgetUI;
}

const DeleteBudgetModal = ({ open, onClose, budget }: DeleteBudgetModalProps) => {
  const { name } = budget;
  const { deleteBudget, isLoadingDeleteBudget: isLoading } = useBudgets();

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
          { (isLoading) ? (<LoadingSpinner />) : 'Delete' }
        </CancelButton>
      </Container>
    </Dialog>
  );
};

export { DeleteBudgetModal };

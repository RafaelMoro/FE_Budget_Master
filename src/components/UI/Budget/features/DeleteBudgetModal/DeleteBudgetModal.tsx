import { Dialog } from '@mui/material';
import { Container, Title, WarnText } from './DeleteBudgetModal.styled';
import { BudgetUI } from '../../../../../globalInterface';
import { CancelButton, SecondaryButton } from '../../../../../styles';
import { LoadingSpinner } from '../../../LoadingSpinner';

interface DeleteBudgetModalProps {
  open: boolean;
  onClose: () => void;
  budget: BudgetUI;
}

const DeleteBudgetModal = ({ open, onClose, budget }: DeleteBudgetModalProps) => {
  const { name } = budget;
  // Change this for the loading flag of the mutation
  const loading = true;
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
        <CancelButton>
          { (loading) ? (<LoadingSpinner />) : 'Delete' }
        </CancelButton>
      </Container>
    </Dialog>
  );
};

export { DeleteBudgetModal };

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
          ¿Está seguro(a) que desea eliminar el presupuesto:
          {' '}
          &quot;
          {name}
          &quot;?
        </Title>
        <WarnText>Esta acción no puede deshacerse.</WarnText>
        <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
        <CancelButton onClick={handleDelete}>
          { (!isLoading && !isSuccess) && 'Eliminar' }
          { (isLoading && !isSuccess) && <LoadingSpinner /> }
          { (!isLoading && isSuccess) && (<AppIcon icon="TickMark" fillColor={AppColors.white} />) }
        </CancelButton>
      </Container>
    </Dialog>
  );
};

export { DeleteBudgetModal };

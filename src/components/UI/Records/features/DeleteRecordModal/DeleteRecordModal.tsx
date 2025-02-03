import { Dialog } from '@mui/material';
import { CancelButton, SecondaryButton } from '../../../../../styles';
import { DeleteRecordContainer, DeleteRecordTitle, DeleteRecordWarn } from './DeleteRecordModal.styled';
import { useRecords } from '../../../../../hooks/useRecords/useRecords';
import { useGuestUser } from '../../../../../hooks/useGuestUser/useGuestUser';
import { AnyRecord } from '../../../../../globalInterface';
import { LoadingSpinner } from '../../../LoadingSpinner';

interface DeleteRecordModalProps {
  open: boolean;
  onClose: () => void;
  record: AnyRecord;
  isExpense: boolean;
  closeDrawer: () => void;
}

const DeleteRecordModal = ({
  open, onClose, record, isExpense, closeDrawer,
}: DeleteRecordModalProps) => {
  const { shortName: recordName, typeOfRecord } = record;
  const isTransfer = typeOfRecord === 'transfer';
  const isTypeExpense = typeOfRecord === 'expense';
  const { isGuestUser } = useGuestUser();
  const { deleteRecord, deleteExpense, loadingDeleteRecord } = useRecords({
    recordToBeDeleted: record, deleteRecordExpense: isExpense, closeDeleteRecordModalCb: onClose, closeDrawer,
  });

  const handleDeleteRecord = () => {
    // If it's type expense and not transfer, call delete expense function.
    if (isTypeExpense) {
      deleteExpense({ isGuestUser: isGuestUser ?? false });
      return;
    }
    deleteRecord({ deleteTransfer: isTransfer, isGuestUser: isGuestUser ?? false });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DeleteRecordContainer>
        <DeleteRecordTitle>
          ¿Está seguro que desea borrar la transacción:
          {' '}
          &quot;
          {recordName}
          &quot;
          ?
        </DeleteRecordTitle>
        <DeleteRecordWarn>Esta acción no puede deshacerse.</DeleteRecordWarn>
        <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
        <CancelButton
          disabled={loadingDeleteRecord}
          onClick={handleDeleteRecord}
        >
          { (loadingDeleteRecord) ? (<LoadingSpinner />) : 'eliminar' }
        </CancelButton>
      </DeleteRecordContainer>
    </Dialog>
  );
};

export { DeleteRecordModal };

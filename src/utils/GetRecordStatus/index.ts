import { RecordStatusType } from '../../aliasType';
import { TypeOfRecord } from '../../globalInterface';

export const getRecordStatus = ({ typeOfRecord, isPaid }: { typeOfRecord: TypeOfRecord, isPaid?: boolean }): RecordStatusType => {
  if (typeOfRecord === 'transfer') {
    return 'Transferencia';
  }
  if (typeOfRecord === 'expense' && isPaid) {
    return 'Pagado';
  }
  return 'Sin pagar';
};

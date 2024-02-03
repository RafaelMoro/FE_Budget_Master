import {
  IconButton, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { RecordDrawerProps } from '../../interface';
import { DeleteIcon, CloseIcon, EditIcon } from '../../../Icons';
import {
  RecordDrawerContainer, RecordDrawerTitle, RecordDrawerText,
  RecordDrawerDescription, DrawerChipContainer,
  RecordDrawerPriceContainer,
  DrawerTitleContainer,
  DrawerCloseBox,
} from './RecordDrawer.styled';
import { Chip } from '../../../../../styles';
import { ShowIndebtedPeople } from '../ShowIndebtedPeople/ShowIndebtedPeople';
import { ShowExpenses } from '../ShowExpenses';
import { EDIT_RECORD_ROUTE } from '../../../../../pages/RoutesConstants';
import { RecordSubtitleText } from '../../Records.styled';
import { useAppDispatch } from '../../../../../redux/hooks';
import { setRecordToBeModified } from '../../../../../redux/slices/Records/records.slice';

const RecordDrawer = ({
  record, amountShown, expensesPaid, chipColor, onCloseCb = () => {}, openDeleteRecordModal = () => {},
}: RecordDrawerProps) => {
  const {
    shortName, description, fullDate, formattedTime,
    category, subCategory, tag, indebtedPeople, budgets,
  } = record;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditRecord = () => {
    dispatch(setRecordToBeModified(record));
    navigate(EDIT_RECORD_ROUTE);
  };

  return (
    <RecordDrawerContainer>
      <DrawerCloseBox>
        <IconButton onClick={onCloseCb}>
          <CloseIcon />
        </IconButton>
      </DrawerCloseBox>
      <DrawerTitleContainer>
        <RecordDrawerTitle>{shortName}</RecordDrawerTitle>
        <IconButton onClick={handleEditRecord}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={openDeleteRecordModal}>
          <DeleteIcon />
        </IconButton>
      </DrawerTitleContainer>
      <Typography variant="body2">{fullDate}</Typography>
      <Typography variant="body2">{formattedTime}</Typography>
      <RecordDrawerText>{category.categoryName}</RecordDrawerText>
      <RecordDrawerText>{subCategory}</RecordDrawerText>
      <RecordDrawerPriceContainer>
        { amountShown }
      </RecordDrawerPriceContainer>
      <DrawerChipContainer afterContent="Budgets">
        { budgets.length === 0 && (<RecordSubtitleText>No budgets</RecordSubtitleText>) }
        { budgets.length > 0 && budgets.map((budget, index) => (
          <Chip key={`${index + 1}-${budget}`} label={budget} variant="outlined" chipColor={chipColor} />
        ))}
      </DrawerChipContainer>
      <DrawerChipContainer afterContent="Tags">
        { tag.length === 0 && (<RecordSubtitleText>No tags</RecordSubtitleText>) }
        { tag.length > 0 && tag.map((item, index) => (
          <Chip key={`${index + 1}-${item}`} label={item} variant="outlined" chipColor={chipColor} />
        ))}
      </DrawerChipContainer>
      <RecordDrawerDescription>{description}</RecordDrawerDescription>
      { (indebtedPeople.length > 0) && (
      <ShowIndebtedPeople indebtedPeople={indebtedPeople} inRecordDrawer />
      ) }
      { (expensesPaid.length > 0) && (
      <ShowExpenses expenses={expensesPaid} isGrid />
      ) }
    </RecordDrawerContainer>
  );
};

export { RecordDrawer };

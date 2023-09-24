import {
  IconButton,
} from '@mui/material';

import { RecordDrawerProps } from '../../interface';
import { DeleteIcon, CloseIcon, EditIcon } from '../../../Icons';
import {
  RecordDrawerContainer, RecordDrawerTitle, RecordDrawerDatetime, RecordDrawerText,
  RecordDrawerDescription, DrawerChipContainer,
  RecordDrawerPriceContainer,
  DrawerTitleContainer,
  DrawerCloseBox,
} from '../../Records.styled';
import { Chip } from '../../../../../styles';
import { ShowIndebtedPeople } from '../ShowIndebtedPeople/ShowIndebtedPeople';
import { ShowExpenses } from '../ShowExpenses';

const RecordDrawer = ({
  shortName, description, fullDate, formattedTime, expensesPaid,
  category, subCategory, tag, indebtedPeople, budgets, amountShown,
  onCloseCb = () => {}, openDeleteRecordModal = () => {},
}: RecordDrawerProps) => (
  <RecordDrawerContainer>
    <DrawerCloseBox>
      <IconButton onClick={onCloseCb}>
        <CloseIcon />
      </IconButton>
    </DrawerCloseBox>
    <DrawerTitleContainer>
      <RecordDrawerTitle>{shortName}</RecordDrawerTitle>
      <IconButton onClick={() => {}}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={openDeleteRecordModal}>
        <DeleteIcon />
      </IconButton>
    </DrawerTitleContainer>
    <RecordDrawerDatetime>{fullDate}</RecordDrawerDatetime>
    <RecordDrawerDatetime>{formattedTime}</RecordDrawerDatetime>
    <RecordDrawerText>{category.categoryName}</RecordDrawerText>
    <RecordDrawerText>{subCategory}</RecordDrawerText>
    <RecordDrawerPriceContainer>
      { amountShown }
    </RecordDrawerPriceContainer>
    <DrawerChipContainer afterContent="Budgets">
      { budgets.length === 0 && (<Chip label="No Budget" variant="outlined" color="secondary" />) }
      { budgets.length > 0 && budgets.map((budget, index) => (
        <Chip key={`${index + 1}-${budget}`} label={budget} variant="outlined" color="primary" />
      ))}
    </DrawerChipContainer>
    <DrawerChipContainer afterContent="Tags">
      { tag.length === 0 && (<Chip label="No Tags" variant="outlined" color="secondary" />) }
      { tag.length > 0 && tag.map((item, index) => (
        <Chip key={`${index + 1}-${item}`} label={item} variant="outlined" color="primary" />
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

export { RecordDrawer };

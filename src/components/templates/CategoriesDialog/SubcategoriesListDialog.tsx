import {
  Collapse, List, IconButton,
} from '@mui/material';
import { AppIcon } from '../../UI/Icons';
import { AppColors, FlexContainer } from '../../../styles';
import { SubcategoryText } from './CategoriesDialog.styled';
import { SubcategoriesListDialogProps } from './CategoryDialog.interface';

const SubcategoriesListDialog = ({
  openList, subCategories, categoryName, handleDelete, handleEdit,
}: SubcategoriesListDialogProps) => (
  <Collapse in={openList} timeout="auto" unmountOnExit>
    <FlexContainer gap={2} justifyContent="center">
      <IconButton aria-label={`boton-editar-categoria-${categoryName}`} onClick={handleEdit}>
        <AppIcon icon="Edit" fillColor={AppColors.primary} />
      </IconButton>
      <IconButton aria-label={`boton-eliminar-categoria-${categoryName}`} onClick={handleDelete}>
        <AppIcon icon="Delete" fillColor={AppColors.negative} />
      </IconButton>
    </FlexContainer>
    <List component="div" disablePadding>
      { subCategories.map((subcategory) => (
        <SubcategoryText key={subcategory} sx={{ pl: 4 }} primary={subcategory} />
      ))}
    </List>
  </Collapse>
);

export { SubcategoriesListDialog };
